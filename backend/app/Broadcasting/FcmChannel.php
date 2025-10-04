<?php

namespace App\Broadcasting;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Google\Auth\ApplicationDefaultCredentials;
use Google\Auth\Cache\SysVCacheItemPool;
use Google\Auth\Credentials\ServiceAccountCredentials;

class FcmChannel
{
    protected $fcmUrl = 'https://fcm.googleapis.com/v1/projects/{project_id}/messages:send';
    protected $projectId;
    protected $serviceAccountPath;

    public function __construct()
    {
        $this->projectId = config('services.fcm.project_id');
        $this->serviceAccountPath = storage_path('app/firebase-service-account.json');
    }

    /**
     * Get access token using service account
     */
    protected function getAccessToken()
    {
        try {
            if (!file_exists($this->serviceAccountPath)) {
                Log::error("❌ FCM Channel: Service account file not found", [
                    'path' => $this->serviceAccountPath
                ]);
                return null;
            }

            $credentials = new ServiceAccountCredentials(
                'https://www.googleapis.com/auth/firebase.messaging',
                $this->serviceAccountPath
            );

            $token = $credentials->fetchAuthToken();
            return $token['access_token'] ?? null;
        } catch (\Exception $e) {
            Log::error("❌ FCM Channel: Failed to get access token: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Send the given notification.
     */
    public function send($notifiable, Notification $notification)
    {
        Log::info("🔔 FCM Channel: Attempting to send notification", [
            'user_id' => $notifiable->id,
            'has_push_token' => !empty($notifiable->push_token),
            'push_notifications_enabled' => $notifiable->push_notifications_enabled,
            'notification_type' => get_class($notification),
            'project_id' => $this->projectId
        ]);

        if (!$notifiable->push_token || !$notifiable->push_notifications_enabled) {
            Log::info("❌ FCM Channel: Skipping notification - no token or disabled", [
                'user_id' => $notifiable->id,
                'has_push_token' => !empty($notifiable->push_token),
                'push_notifications_enabled' => $notifiable->push_notifications_enabled
            ]);
            return false;
        }

        $message = $notification->toFcm($notifiable);
        
        Log::info("📤 FCM Channel: Preparing FCM V1 payload", [
            'user_id' => $notifiable->id,
            'title' => $message['notification']['title'] ?? 'no title',
            'body' => $message['notification']['body'] ?? 'no body',
            'project_id' => $this->projectId
        ]);

        // Determine channel based on notification type
        $data = $message['data'] ?? [];
        $type = $data['type'] ?? '';
        $channelId = 'calls'; // default
        
        if (str_contains($type, 'chat_message') || str_contains($type, 'new_message')) {
            $channelId = 'messages';
        } elseif (str_contains($type, 'appointment')) {
            $channelId = 'appointments';
        }

        // FCM V1 API payload structure
        $payload = [
            'message' => [
                'token' => $notifiable->push_token,
                'notification' => [
                    'title' => $message['notification']['title'] ?? '',
                    'body' => $message['notification']['body'] ?? '',
                ],
                'android' => [
                    // Set overall Android priority at the correct level for FCM v1
                    'priority' => 'HIGH',
                    'notification' => [
                        'sound' => 'default',
                        // Route to appropriate channel based on type
                        'channel_id' => $channelId,
                        // Use correct field name for notification-level priority in FCM v1
                        'notification_priority' => $channelId === 'calls' ? 'PRIORITY_MAX' : 'PRIORITY_HIGH',
                        // Visibility must be an integer enum for some clients (1=Public, 0=Private, -1=Secret)
                        'visibility' => 1
                    ],
                ],
                'apns' => [
                    'payload' => [
                        'aps' => [
                            'sound' => 'default',
                            'badge' => 1,
                        ],
                    ],
                ],
                'data' => $data,
            ]
        ];

        try {
            $accessToken = $this->getAccessToken();
            if (!$accessToken) {
                Log::error("❌ FCM Channel: Failed to get access token");
                return false;
            }

            $url = str_replace('{project_id}', $this->projectId, $this->fcmUrl);
            
            Log::info("🌐 FCM Channel: Sending HTTP request to FCM V1 API", [
                'user_id' => $notifiable->id,
                'url' => $url,
                'token_length' => strlen($notifiable->push_token)
            ]);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
                'Content-Type' => 'application/json',
            ])->post($url, $payload);

            if ($response->successful()) {
                $result = $response->json();
                Log::info("✅ FCM Channel: Notification sent successfully", [
                    'user_id' => $notifiable->id,
                    'name' => $result['name'] ?? 'no name',
                    'response' => $result
                ]);
                return $result;
            } else {
                Log::error("❌ FCM Channel: Failed to send notification", [
                    'user_id' => $notifiable->id,
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return false;
            }
        } catch (\Exception $e) {
            Log::error("❌ FCM Channel: Exception sending notification: " . $e->getMessage(), [
                'user_id' => $notifiable->id,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return false;
        }
    }
}
