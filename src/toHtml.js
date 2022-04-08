const stack = [];

function toHtml(data) {
  for (let i = 1; i <= 8; i++) {
    push(data, i);
  }

  return stack.join("");
}

function push(data, number) {
  stack.push(
    `<div style="margin: 20px 0 0 0; padding: 0.8rem">[코트${number}] 예약가능한 정보</div>`
  );
  stack.push("<table>");
  data[`court${number}`].map((item) => {
    const article = `
    <tr>
      <td style="padding: 0.8rem">
        ${item.date}
      </td>
      <td style="padding: 0.8rem">
        ${item.time}
      </td>
    </tr>`;
    stack.push(article);
  });
  stack.push("</table>");
}

module.exports = toHtml;
