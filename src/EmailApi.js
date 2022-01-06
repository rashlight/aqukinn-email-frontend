function send_emails(msg){
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(msg.api_key);
  
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
