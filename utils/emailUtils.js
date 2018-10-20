import mailgun from 'mailgun.js'
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});


export const sendConfirmationEmail = async (toEmail, confirmationToken) => {
    let html = `
        <h1>Bienvenido a Germanos!</h1>
        <p>Por favor confirma tu email haciendo click en el siguient link </p>
        <a href="https://www.${process.env.MAILGUN_DOMAIN}/confirmation/${confirmationToken}">Confirmar</a>
    `
    await sendEmail(toEmail, "Bienvenido a Germanos! Por favor confirma to email", html)
}

export const sendEmail = async (toEmail, subject, htmlContent) => {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Bienvenido a Germanos <no-reply@${process.env.MAILGUN_DOMAIN}>`,
        to: [toEmail],
        subject: "Hello",
        text: subject,
        html: htmlContent
    })
}