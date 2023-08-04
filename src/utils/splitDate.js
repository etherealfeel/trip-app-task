export const splitDate = (dateString) => {
  const [dateDay, dateMonth, dateYear] = dateString.split('.');
  const formattedDate = `${dateMonth}/${dateDay}/${dateYear}`;
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return { year, month, day, hour, minute, second };
};
