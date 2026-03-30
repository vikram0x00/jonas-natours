import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const sendEmail = async (options)=>{
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secured: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	});

	const mailOptions = {
		from: "Natours <system@natours.app>",
		to: options.email,
		subject: options.subject,
		text: options.text
	}

	await transporter.sendMail(mailOptions);
}

export default sendEmail;