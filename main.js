const getReserInfo = require("./src/scraping");
const toHtml = require("./src/toHtml");
const sendMail = require("./src/sendEmail");
const generateForm = require("./src/generateForm");
const cron = require("node-cron");
const getCurrentTime = require("./src/date");
const courtGroup = {};
const targetUrlArray = [];

/*
  작업 스케쥴러 - 11:59, 23:59 마다 해당 앱 실행
*/
cron.schedule("59 11,23 * * *", () => {
  main();
});

/*
  스크래핑 위치: 김포도시관리공사 통합예약시스템
  https://yeyak.guc.or.kr/
*/

function main() {
  for (let i = 0; i < 8; i++) {
    targetUrlArray.push(
      `https://yeyak.guc.or.kr/rent/application/index/${
        getCurrentTime().dateNow
      }/2/GIMPO02/${getCurrentTime().month}/${i + 18}`
    );
  }

  const scrapingPromise = targetUrlArray.map((item, _) => {
    return getReserInfo(item);
  });

  Promise.all(scrapingPromise)
    .then((res) => {
      for (let i = 0; i < 8; i++) {
        courtGroup[`court${i + 1}`] = res[i];
      }

      const form = generateForm(courtGroup[`court1`]);

      for (let i = 0; i < 8; i++) {
        courtGroup[`court${i + 1}`].forEach((item) => {
          form.forEach((o) => {
            o.forEach((k) => {
              if (k.date === item.date && k.time === item.time) {
                k.court.push(i + 1);
              }
            });
          });
        });
      }
      return toHtml(form);
    })
    .then((form) => {
      sendMail(form);
    })
    .catch((e) => console.error(e));
}
