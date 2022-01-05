
# aqukinn-email
*A GUI email module for the Aqukinn discord bot ([https://github.com/j1nxie/Aqukinn](https://github.com/j1nxie/Aqukinn))*

#### ~ Releases can be found -> [here](https://github.com/rashlight/aqukinn-email/releases) <-

## Build instruction
Download this repository, install prequisites and start building:

    git clone https://github.com/rashlight/aqukinn-email
    cd aqukinn-email
    npm install draft-js react react-dom styled-components draft-js-export-html
	npm install @sendgrid/mail
	npm install dotenv
    npm start

## General Usage
Please refer to the Help & About button on the web app.

## Configuration
This application uses the SendGrid API to send emails to specified recipient(s).
The module uses an ENV file in order to store data:

    # RETRIEVE API KEY FROM SENDGRID
	INSERT_API_KEY="<INSERT_API_KEY_HERE>"

	# THE INFORMATION TO FEED INTO THE API
	EMAIL_TO=e1@d1.com, e2@sd2.net
	EMAIL_FROM="hello@world.io"
	SUBJECT="Sending emails is Fun"
	TEXT="This is a sample message"
	HTML="<strong>and easy to do anywhere, even with Node.js</strong>"

Description of these variables:

`INSERT_API_KEY`: The key provided by the SendGrid API. Please note that your account will need to pass the Single Sender Verification test.

`EMAIL_TO:` A list of emails to send to, seperated by comma

`EMAIL_FROM`: A single email that associated with your SendGrid account

`SUBJECT`: A **text-only** string of the email title

`TEXT`: The body (content) of the email, **text-only**

`HTML`: The body of the email, in HTML representation (note that you are restricted in the features that you can add to your email frame)

If `TEXT` and `HTML` are specified, only `HTML` variable will be sent.


## Contribution
Supports, issues and help are welcome, provided that you follow the [Code Of Conduct](https://github.com/rashlight/aqukinn-email/blob/main/CODE_OF_CONDUCT.md).

## Licenses
This program is licensed by [LGPL v2.1](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html)

UI borrowed from [draft.js](https://github.com/facebook/draft-js)  ([MIT License](https://github.com/facebook/draft-js/blob/main/LICENSE))

Email implementation by [SendGrid](https://sendgrid.com/)

Also use components from [draft-js-export-html](https://www.npmjs.com/package/draft-js-export-html) ([ISC License](https://github.com/sstur/draft-js-utils/blob/master/LICENSE)), [styled-components](https://www.npmjs.com/package/styled-components/v/4.1.3) ([MIT License](https://github.com/styled-components/styled-components/blob/main/LICENSE))



