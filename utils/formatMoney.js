export const currencyFormat = (num, fixed) => {
  const str = num.toString().split(".");
  str[0] = str[0].replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    (/\d(?=(\d{3})+\.)/g, "$&,")
  );
  if (str?.[1]) str[1] = str[1].slice(0, fixed);
  else str[1] = "";
  return `${str[0]}${str[1] ? "." + str[1] : ""}`;
};
export const currencyFormatMoney = (num, fixed) => {
  const str = num.toString().split(".");
  str[0] = str[0].replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    (/\d(?=(\d{3})+\.)/g, "$&.")
  );
  if (str?.[1]) str[1] = str[1].slice(0, fixed);
  else str[1] = "";
  return `${str[0]}${str[1] ? "." + str[1] : ""}`;
};
export const currencyFormatNew = (num) => {
  let str = num.toString();
  str = str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return str;
};
