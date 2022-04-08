const currentDate = require("./src/date");
const getReserInfo = require("./src/scraping");
const toHtml = require("./src/toHtml");
const sendMail = require("./src/sendEmail");

const courtGroup = {};
const targetUrlArray = [];

/*
김포도시관리공사 통합예약시스템
https://yeyak.guc.or.kr/
*/

for (let i = 0; i < 8; i++) {
  targetUrlArray.push(
    `https://yeyak.guc.or.kr/rent/application/index/${
      currentDate.dateNow
    }/2/GIMPO02/${currentDate.month}/${i + 18}`
  );
}

const scrapingPromise = targetUrlArray.map((item, index) => {
  return getReserInfo(item, index + 1);
});

Promise.all(scrapingPromise)
  .then((res) => {
    for (let i = 0; i < 8; i++) {
      courtGroup[`court${i + 1}`] = res[i];
    }
    return toHtml(courtGroup);
  })
  .then((form) => {
    sendMail(form);
  })
  .catch((e) => console.error(e));
