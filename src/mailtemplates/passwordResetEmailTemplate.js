export function passwordResetEmailTemplate(resetUrl) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .button {
              display: inline-block;
              padding: 12px 20px;
              margin: 20px 0;
              color: #ffffff;
              background-color: #007bff;
              border-radius: 4px;
              text-decoration: none;
              font-size: 16px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #666666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested a password reset. Please click the button below to reset your password. This link will expire in 5 minutes:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>If you did not request a password reset, you can safely ignore this email.</p>
            <p>Best regards,<br>Your App Team</p>
            <div class="footer">
              <p>If you have questions, please contact our support team.</p>
            </div>
          </div>
        </body>
      </html>
    `;
}
