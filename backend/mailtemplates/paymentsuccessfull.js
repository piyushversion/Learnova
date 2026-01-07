export function paymentsuccessfullemail(name, amount, orderid, paymentid) {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Payment Successful</title>
        <style>

            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            .set{

                display:flex;
                align-items:center;
                gap:20px;
                justify-content:center;
                text-decoration: none;
                width: max-content;
                margin: auto;

            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {

                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                margin-top: 10px

            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {

                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;

            }
    
            .support {

                font-size: 14px;
                color: #999999;
                margin-top: 20px;

            }
    
            .highlight {

                font-weight: bold;

            }
            
            h2{

                font-size: 30px;
                letter-spacing: 0.025em;
                padding-left:10px;
                color:#5d6EEE;
            
            }

            img{
            
                width: 50px;
                object-fit: contain;

            }
            
        </style>
    
    </head>
    
    <body>

        <div class="container">

            <a class='set' href="https://its-piyush-portfolio.netlify.app">
            
                <img src="https://res.cloudinary.com/doeclcssz/image/upload/v1757271450/Learnova/hosaaxkv03qi3cwakwmf.png" alt="XXX"/>
                
                <h2>Learnova</h2> 

            </a>

            <div class="message">Payment Received Successfully</div>

            <div class="body">

                <p>Dear ${name},</p>

                <p>We’re glad to let you know that your payment of <span class='highlight'>₹${amount}</span> has been processed successfully.</p>

                <p>Below are your transaction details for reference:</p>

                <p><b>Payment ID:</b> ${paymentid}</p>

                <p><b>Order ID:</b> ${orderid}</p>

            </div>

            <div class="support">Need help? Reach out to our support team anytime at 

                <a href="mailto:piyushdhote190@gmail.com">piyushdhote190@gmail.com</a>

            </div>

        </div>

    </body>
    
    </html>`
}
