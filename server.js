const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: 'New Contact Form Submission',
        text: `You have received a new message from the portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sendimg email:', error);
            return res.status(500).json({ message: 'There was an error sending your message.' })
        }

        console.log(`Received contact message: \nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

        const confirmMail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message',
            text: `Hi ${name},\n\nThanks for reaching out! We'll get back to you soon.\n\nYour message:\n"${message}"`,
        };

        transporter.sendMail(confirmMail, (err, info) => {
            if (err) {
                console.error('Error sending confirmation:', err);
            } else {
                console.log('Confirmation sent:', info.response);
            }
        });

        res.json({ message: 'Your message has been sent. Thank you!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});