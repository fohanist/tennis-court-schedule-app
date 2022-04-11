const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");

async function getReserInfo(targetUrl) {
  const response = await axios.get(targetUrl, {
    responseType: "arraybuffer",
  });

  const html = iconv.decode(response.data, "EUC-KR").toString();
  const $ = cheerio.load(html);

  let currentDate = null;
  const currentCourt = [];
  $(".rent_daylist_table_sports")
    .children("tbody")
    .children("tr")
    .each((_, element) => {
      const tdCount = $(element).children().length;

      /*
          데이터 진행 날짜 업데이트
          */
      if (tdCount === 6) {
        currentDate = $(element).children("td:nth-of-type(1)").text();
      }

      /*
          날짜가 있는 경우
          */
      if (tdCount === 6) {
        const data = {
          date: currentDate,
          time: $(element).children("td:nth-of-type(3)").text(),
          reserStatus:
            $(element)
              .children("td:nth-of-type(6)")
              .children("img")
              .attr("alt") || "예약가능",
        };
        if (data.reserStatus === "예약가능") {
          currentCourt.push(data);
        }
      }

      /*
          날짜가 없는 경우
          */
      if (tdCount === 5) {
        const data = {
          date: currentDate,
          time: $(element).children("td:nth-of-type(2)").text(),
          reserStatus:
            $(element)
              .children("td:nth-of-type(5)")
              .children("img")
              .attr("alt") || "예약가능",
        };
        if (data.reserStatus === "예약가능") {
          currentCourt.push(data);
        }
      }
    });

  return currentCourt;
}

module.exports = getReserInfo;
