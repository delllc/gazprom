<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param string $token
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    // app/Mail/PasswordResetMail.php

    public function build(): PasswordResetMail
    {
       $expiration = config('auth.passwords.users.expire', 60); // 60 минут по умолчанию

        return $this->subject('Сброс пароля для ' . config('app.name'))
            ->markdown('emails.password-reset')
            ->with([
                'resetUrl' => url(config('app.frontend_url') . "/reset-password?token={$this->token}"),
                'expiration' => $expiration,
            ]);
    }
}
