class InitForm {
  initForm = [
    { date: null, time: "06:00 ~ 07:00", court: [] },
    { date: null, time: "07:00 ~ 08:00", court: [] },
    { date: null, time: "08:00 ~ 09:00", court: [] },
    { date: null, time: "09:00 ~ 10:00", court: [] },
    { date: null, time: "10:00 ~ 11:00", court: [] },
    { date: null, time: "11:00 ~ 12:00", court: [] },
    { date: null, time: "12:00 ~ 13:00", court: [] },
    { date: null, time: "13:00 ~ 14:00", court: [] },
    { date: null, time: "14:00 ~ 15:00", court: [] },
    { date: null, time: "15:00 ~ 16:00", court: [] },
    { date: null, time: "16:00 ~ 17:00", court: [] },
    { date: null, time: "17:00 ~ 18:00", court: [] },
    { date: null, time: "18:00 ~ 19:00", court: [] },
    { date: null, time: "19:00 ~ 20:00", court: [] },
    { date: null, time: "20:00 ~ 21:00", court: [] },
    { date: null, time: "21:00 ~ 22:00", court: [] },
  ];

  constructor(date) {
    this.initForm.map((item) => {
      item.date = date;
    });
  }
}

function generateForm(form) {
  let currentDate = null;
  let dateList = [];
  let result = [];
  form.map((item) => {
    if (item.date !== currentDate) {
      dateList.push(item.date);
      currentDate = item.date;
    } else {
      currentDate = item.date;
    }
  });

  dateList.forEach((item) => {
    const resultForm = new InitForm(item);
    result.push(resultForm.initForm);
  });

  return result;
}

module.exports = generateForm;
