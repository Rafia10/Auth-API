const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "testsmtp@cubixlabs.com",
    pass: "cubix@2022",
  },
});

module.exports = transport;
