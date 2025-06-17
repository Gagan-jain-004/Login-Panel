import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
            services: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });

        export default transporter;