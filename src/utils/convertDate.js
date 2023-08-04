export const convertDate = (dateString) => {
  const [yy, mm, dd] = dateString.split('-');
  const dateObject = new Date(`${yy}-${mm}-${dd}`);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear().toString().slice(2);

  return `${day}.${month}.${year}`;
};
