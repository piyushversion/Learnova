const passwordresettemplate = (link) => {
	
	return `<!DOCTYPE html>

	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Password Reset Request</title>
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

			.container a{

				color:white;
				font-size:20px;
				padding-bottom:10px;

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
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 15px;
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

			a{
            
                text-decoration: none;
                color: white;

            }

            img{
            
                width: 50px;
                object-fit: contain;

            }

            h2{

                font-size: 30px;
                letter-spacing: 0.025em;
                padding-left:10px;
                color:#5d6EEE;
            
            }

		</style>
	
	</head>
	
	<body>

		<div class="container">

			<a class='set' href="https://its-piyush-portfolio.netlify.app">
            
                <img src="https://res.cloudinary.com/doeclcssz/image/upload/v1757271450/Learnova/hosaaxkv03qi3cwakwmf.png" alt="XXX"/>
                
                <h2>Learnova</h2> 

            </a>

			<div class="message">Password Reset Link</div>

			<div class="body">

              <p>Hi there,</p>

              <p>We received a request to reset your password for your <b>Learnova</b> account. You can set a new password by clicking the button below:</p>

              <a href="${link}" class="cta">Reset Password</a>

              <p>This link will expire in <b>5 minutes</b> for security reasons. If you didn’t request this password reset, you can safely ignore this email.</p>

          </div>

		    <div class="support">Need help? Reach out to our support team anytime at 

                <a href="mailto:piyushdhote190@gmail.com"><span style="color:#15c;font-size:14px">piyushdhote190@gmail.com</span></a>

            </div>

		</div>

	</body>
	
	</html>`;
};

module.exports = passwordresettemplate;