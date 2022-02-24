const transport = require("../config/mailer");

async function sendEmail(from, to, subject, text) {
  try {
    const response = await transport.sendMail({
      from,
      to,
      subject,
      text,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendEmail;
