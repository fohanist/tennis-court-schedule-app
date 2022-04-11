const nodemailer = require("nodemailer");
const currentDate = require("./date");
require("dotenv").config();

async function sendMail(contents) {
  let transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.NAVER_ID, // 보내는 메일의 주소
      pass: process.env.NAVER_PW, // 보내는 메일의 비밀번호
    },
  });

  let info = await transporter.sendMail({
    from: process.env.FROM_MAIL_ADRESS,
    to: process.env.TO_MAIL_ADRESS,
    subject: `[${currentDate.dateNow} 기준] 김포생활체육관 테니스장 예약 가능 코트`,
    html: contents,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;
