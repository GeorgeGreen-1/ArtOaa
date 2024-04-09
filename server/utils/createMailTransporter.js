import nodemailer from "nodemailer";
const createMailTransporter = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CLIENT_EMAIL,
      pass: process.env.CLIENT_PASS,
    },
  });

  return transporter;
};

export default createMailTransporter;
