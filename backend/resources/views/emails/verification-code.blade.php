<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - {{ $appName }}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 40px 30px;
        }
        .verification-code {
            background-color: #f8f9fa;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
        }
        .instructions {
            background-color: #e8f5e8;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        .instructions h3 {
            margin: 0 0 10px 0;
            color: #2e7d32;
            font-size: 18px;
        }
        .instructions ul {
            margin: 0;
            padding-left: 20px;
        }
        .instructions li {
            margin-bottom: 8px;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 0;
            color: #6c757d;
            font-size: 14px;
        }
        .expiry-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .expiry-notice strong {
            color: #856404;
        }
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px 0;
            border-bottom: 2px solid #f8f9fa;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            .content, .footer {
                padding: 20px;
            }
            .code {
                font-size: 24px;
                letter-spacing: 2px;
            }
            .header-content {
                flex-direction: column;
                text-align: center;
            }
            .header-content h1 {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Professional Header with Branding -->
        <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; text-align: center; color: white;">
            <div style="display: inline-flex; align-items: center; gap: 15px; justify-content: center;">
                <div style="width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #4CAF50; font-size: 18px;">
                    DA
                </div>
                <div>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Doc Available</h1>
                    <p style="margin: 0; font-size: 14px; opacity: 0.9;">Healthcare Platform</p>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="greeting">
                <span style="font-size: 24px; color: #2c3e50;">🏥 Welcome to Doc Available!</span>
            </div>
            <p>Thank you for registering with {{ $appName }}. To complete your account setup, please use the verification code below:</p>
            
            <div class="verification-code">
                <div class="code">{{ $code }}</div>
                <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 14px;">Enter this code in the verification field</p>
            </div>
            
            <div class="expiry-notice">
                <strong>⏰ This code expires in {{ $expiresIn }}</strong>
            </div>
            
            <div class="instructions">
                <h3>📋 How to verify your email:</h3>
                <ul>
                    <li>Return to the {{ $appName }} app</li>
                    <li>Enter the verification code above</li>
                    <li>Click "Complete Registration"</li>
                    <li>Your account will be activated immediately</li>
                </ul>
            </div>
            
            <p><strong>Didn't request this code?</strong> If you didn't sign up for {{ $appName }}, you can safely ignore this email.</p>
            
            <p><strong>Need help?</strong> If you're having trouble, please contact our support team.</p>
        </div>
        
        <div class="footer">
            <p><strong>{{ $appName }} - Healthcare Platform</strong></p>
            <p>&copy; {{ date('Y') }} {{ $appName }}. All rights reserved.</p>
            <p>This email was sent to {{ $email }}</p>
            <p style="font-size: 12px; color: #adb5bd; margin-top: 15px;">
                📧 This is an automated message, please do not reply to this email.<br>
                🏥 Connecting patients with healthcare professionals worldwide.
            </p>
        </div>
    </div>
</body>
</html>
