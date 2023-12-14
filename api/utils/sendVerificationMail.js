const nodemailer = require("nodemailer");
const { MAIL_SETTINGS } = require("../constant/constant");

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

const sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Email Verification Code",
      html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h2>Welcome to the club.</h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.verificationCode}</h1>
       </div>
        `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMail
