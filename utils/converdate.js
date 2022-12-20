export const timeUpdate = (date) => {
  const time = new Date() - new Date(date);
  return time < 60000
    ? "Vài giây"
    : time < 3600000
    ? Math.floor(time / 60000) + " phút"
    : time < 86400000
    ? Math.floor(time / 3600000) + " giờ"
    : time < 2592000000
    ? Math.floor(time / 86400000) + " ngày"
    : time < 31104000000
    ? Math.floor(time / 2592000000) + " tháng"
    : Math.floor(time / 31104000000) + " năm";
};

export const convertTimestamp = (time) => {
  return time?.map((item) => {
    return new Date(item).getHours();
  });
};
