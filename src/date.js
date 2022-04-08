const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);
dayjs.extend(timezone);

const currentTime = dayjs().tz("Asia/Seoul");
const dateNow = currentTime.format("YYYY/MM/DD");
const month = currentTime.format("MM");
const currentDate = {
  dateNow,
  month,
};

module.exports = currentDate;
