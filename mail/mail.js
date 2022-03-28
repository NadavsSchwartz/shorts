import nodemailer from 'nodemailer'
import { contactUsMailText } from './text.js'
import fs from 'fs'
const mailConfig = {
    host: 'smtp.porkbun.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
}

const transporter = nodemailer.createTransport(mailConfig)

export default transporter

// Read email templates
const contactUsEmailTemplatePath = new URL(
    'template-contact-us.html',
    import.meta.url
).pathname
const contactUsEmailTemplate = fs
    .readFileSync(contactUsEmailTemplatePath, { encoding: 'utf-8' })
    .replace(/{{domain}}/gm, 'shorten.domains')
    .replace(/{{site_name}}/gm, 'Shorts')

export const contactUs = async ({ email }) => {
    const mail = await transporter.sendMail({
        from: 'Shorts <support@shorten.domains>',
        to: email,
        subject: 'We received your message',
        text: contactUsMailText,
        html: contactUsEmailTemplate,
    })

    if (!mail.accepted.length) {
        throw new Error("Couldn't send verification email. Try again later.")
    }
}
