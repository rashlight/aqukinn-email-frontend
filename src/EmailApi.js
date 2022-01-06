


//var EMAIL_TO = process.env.EMAIL_TO.split(",")
// require('dotenv').config();
/*const msg = {
  to: process.env.EMAIL_TO, // Change to your recipient
  from: process.env.EMAIL_FROM, // Change to your verified sender
  subject: process.env.SUBJECT,
  text: process.env.TEXT,
  html: process.env.HTML,
}
*/


function send_emails(msg){
  const sgMail = require('@sendgrid/mail');



  require('dotenv').config();
  sgMail.setApiKey(process.env.INSERT_API_KEY);

  
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!!')
  })
  .catch((error) => {
    console.error(error)
  });
}

module.exports = {
  send_emails
}; 
