// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

// Nodemailer transporter

// API endpoint for sending emails
app.post('/api/send-email', (req, res) => {
    const { email, subject, message2 } = req.body;

    const mailgun = new Mailgun(formData);
	  const mg = mailgun.client({username: 'api', key: "62341999edf9709e5142d76ca0f4cbac-408f32f3-42740713"});
  

	  mg.messages.create('sandbox4543c9a06b8b4bd4b545664162f6f681.mailgun.org', {
	  	from: `<${email}> <mailgun@sandbox4543c9a06b8b4bd4b545664162f6f681.mailgun.org>`,
	  	to: ["fizzled04@gmail.com"],
	  	subject: subject,
	  	text: message2
	  })
	  .then(msg => console.log(msg)) // logs response data
	  .catch(err => console.log(err)); // logs any error
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});