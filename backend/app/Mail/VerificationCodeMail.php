<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;
    public $email;

    /**
     * Create a new message instance.
     */
    public function __construct($code, $email = null)
    {
        $this->code = $code;
        $this->email = $email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🔐 Email Verification Code - Doc Available',
            from: new \Illuminate\Mail\Mailables\Address(
                config('mail.from.address'),
                'Doc Available - Healthcare Platform'
            ),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.verification-code',
            with: [
                'code' => $this->code,
                'email' => $this->email,
                'expiresIn' => '10 minutes',
                'appName' => config('app.name', 'Doc Available'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        
        // Embed logo as attachment for better email client compatibility
        $logoPath = public_path('images/icon.png');
        if (file_exists($logoPath)) {
            $attachments[] = \Illuminate\Mail\Mailables\Attachment::fromPath($logoPath)
                ->as('logo.png')
                ->withMime('image/png');
        }
        
        // Embed banner as attachment
        $bannerPath = public_path('images/da-x-cover.jpg');
        if (file_exists($bannerPath)) {
            $attachments[] = \Illuminate\Mail\Mailables\Attachment::fromPath($bannerPath)
                ->as('banner.jpg')
                ->withMime('image/jpeg');
        }
        
        return $attachments;
    }
}
