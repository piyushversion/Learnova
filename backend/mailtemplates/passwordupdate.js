const passwordupdatedTemplate = (email, name) => {

	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
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

            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
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

            .support {

                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            a{
            
                text-decoration: none;
                color: white;

            }

        </style>
    
    </head>
    
    <body>

        <div class="container">

            <a class='set' href="https://its-piyush-portfolio.netlify.app">
            
                <img src="https://res.cloudinary.com/doeclcssz/image/upload/v1757271450/Learnova/hosaaxkv03qi3cwakwmf.png" alt="XXX"/>
                
                <h2>Learnova</h2> 

            </a>

            <div class="message">Password Changed Successfully</div>

            <div class="body">

                <p>Hi ${name},</p>
                <p>This is to confirm that the password linked to your account (<span class="highlight">${email}</span>) has been changed successfully.</p>
                <p>If this change wasn’t made by you, please get in touch with our support team right away to protect your account.</p>

            </div>

            <div class="support">Need help? Reach out to our support team anytime at 

                <a href="mailto:piyushdhote190@gmail.com">piyushdhote190@gmail.com</a>

            </div>

        </div>

    </body>
    
    </html>`;
};

module.exports = passwordupdatedTemplate