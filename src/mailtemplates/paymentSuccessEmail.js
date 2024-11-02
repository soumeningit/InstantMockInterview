export function paymentSuccessEmail({ userName, transactionId, amount, date, supportEmail }) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            color: #4CAF50;
        }
        .content {
            padding: 20px 0;
        }
        .content p {
            margin: 5px 0;
        }
        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">Payment Successful</h1>
        <div class="content">
            <p>Dear <strong>${userName}</strong>,</p>
            <p>Thank you for your payment. Here are the details of your transaction:</p>
            <table width="100%" cellpadding="5">
                <tr>
                    <td><strong>Transaction ID:</strong></td>
                    <td>${transactionId}</td>
                </tr>
                <tr>
                    <td><strong>Amount:</strong></td>
                    <td>${amount}</td>
                </tr>
                <tr>
                    <td><strong>Date:</strong></td>
                    <td>${date}</td>
                </tr>
            </table>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
            <p>Thank you for choosing us!</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>
`;
}