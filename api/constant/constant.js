const constant = {
  SALT: 11,

  PORT: process.env.PORT,

  MONGO_URI: process.env.MONGO_URI,

  OTP_LENGTH: 10,

  OTP_CONFIG: {
    upperCaseAlphabets: true,
    specialChars: false,
  },

  OTP_SECRET: process.env.OTP_SECRET,

  MAIL_SETTINGS: {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

  WEBSITE_URL: process.env.WEBSITE_URL,
}

module.exports = constant;
