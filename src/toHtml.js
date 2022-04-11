const stack = [];

function toHtml(data) {
  for (let i = 0; i < data.length; i++) {
    push(data[i]);
  }

  return stack.join("");
}

function push(data) {
  const tdStyle = `
    padding: 0.8rem;
    text-align: center;
  `;
  stack.push(`<table style="border-collapse: collapse">`);
  stack.push(
    `<caption style="margin: 20px 0 0 0; padding: 0.8rem; font-size: 1.4rem;">${data[0].date}</caption>`
  );
  stack.push(`
  <tr>
    <td style="${tdStyle} font-size: 1.2rem;">
      시간대
    </td>
    <td style="${tdStyle} font-size: 1.2rem;">
      예약 가능한 코트
    </td>
  </tr>
  `);
  data.map((item) => {
    const article = `
    <tr style="border: 1px solid #000">
      <td style="${tdStyle}">
        ${item.time}
      </td>
      <td style="${tdStyle}">
        ${item.court.toString()}
      </td>
    </tr>`;
    stack.push(article);
  });
  stack.push("</table>");
}

module.exports = toHtml;
