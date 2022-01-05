const sgMail = require('@sendgrid/mail')

require('dotenv').config();
sgMail.setApiKey(process.env.INSERT_API_KEY)

var EMAIL_TO = process.env.EMAIL_TO.split(",")

const msg = {
  to: EMAIL_TO, // Change to your recipient
  from: process.env.EMAIL_FROM, // Change to your verified sender
  subject: process.env.SUBJECT,
  text: process.env.TEXT,
 // html: process.env.HTML,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!!')
  })
  .catch((error) => {
    console.error(error)
  })