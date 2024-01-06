function formatNumber(number) {
  let roundedNumber = Math.round(number * 100) / 100;
  let isWholeNumber = roundedNumber % 1 === 0;
  let formattedNumber = isWholeNumber
    ? roundedNumber.toString()
    : roundedNumber.toFixed(2);
  formattedNumber = Number(formattedNumber);

  return formattedNumber;
}

module.exports = formatNumber;
