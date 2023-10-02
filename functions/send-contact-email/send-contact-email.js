const nodemailer = require("nodemailer");

exports.handler = async (event, context, callback) => {

  console.log('JSON.parse(event.body)', JSON.parse(event.body))
  

  const { name, mail, message, firstName } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
    
        service: process.env.GATSBY_APP_EMAIL_SERVICE,
        port: 587,
        secure: false,
        auth: {
            user: process.env.GATSBY_APP_EMAIL_USERNAME,
            pass: process.env.GATSBY_APP_EMAIL_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: `${mail} <${process.env.GATSBY_APP_EMAIL_SENDER}>`,
  
        to: process.env.GATSBY_APP_EMAIL_TO,
        subject: `from ${name + " " + firstName}`,
        text: message,
        html: `<b>${message}</b>`,
    });

    console.log('info', info)

    if (info.messageId) {
        return {
            statusCode: 200,
            body: nodemailer.getTestMessageUrl(info)
        }
    }
  
    return {
        statusCode: 400,
        body: "Oops"
    }
  
};