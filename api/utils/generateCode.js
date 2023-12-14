const otpGenerator = require("otp-generator");
const { OTP_LENGTH, OTP_CONFIG } = require("../constant/constant");

const generateCode = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};

module.exports = generateCode
