export function contactUsEmailTemplate(name, email, message) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us Confirmation</title>
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
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #666666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Thank you for Contacting Us, ${name}!</h2>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
            <p>For reference, we have noted your email address as <strong>${email}</strong>.</p>
            <p>Best regards,<br>mockinterview support team</p>
            <div class="footer">
              <p>If you have additional questions, feel free to reach out.</p>
            </div>
          </div>
        </body>
      </html>
    `;
}
