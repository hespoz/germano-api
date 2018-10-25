import mailgun from 'mailgun.js'
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

export const sendUpdateInfoConfirmationEmail = async (toEmail, token) => {
    let html = `
        <h1>Confirma el cambio de tu email!</h1>
        <p>Para confirmar haz click en el siguient link </p>
        <a href="https://www.${process.env.MAILGUN_DOMAIN}/info/update/confirm/${token}">Confirmar</a>
    `
    await sendEmail(toEmail, "Confirma el cambio de tu email!", html)
}


export const sendConfirmationEmail = async (toEmail, confirmationToken) => {
    let html = `
        <h1>Bienvenido a Germanos!</h1>
        <p>Por favor confirma tu email haciendo click en el siguient link </p>
        <a href="https://www.${process.env.MAILGUN_DOMAIN}/confirmation/${confirmationToken}">Confirmar</a>
    `
    await sendEmail(toEmail, "Bienvenido a Germanos! Por favor confirma to email", html)
}

export const sendPasswordRecoveryEmail = async (toEmail, token) => {
    let html = `
        <h1>Recupera tu password!</h1>
        <p>Por favor haz click en el siguiente link para recuperar tu password </p>
        <a href="https://www.${process.env.MAILGUN_DOMAIN}/reset/password/${token}">Confirmar</a>
    `
    await sendEmail(toEmail, "Recupera tu password", html)
}

export const sendEmail = async (toEmail, subject, htmlContent) => {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `Bienvenido a Germanos <no-reply@${process.env.MAILGUN_DOMAIN}>`,
        to: [toEmail],
        subject: subject,
        text: subject,
        html: htmlContent
    })
}
