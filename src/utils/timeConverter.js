export const TimeConverter = (timestamp) => {
  let dateObj = new Date(timestamp);

  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();

  let time = `${year}/${month}/${date} ${hour}:${minute}:${seconds}`;
  console.log(time);
  return time;
};
