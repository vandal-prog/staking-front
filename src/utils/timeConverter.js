export const TimeConverter = (timestamp) => {
  let dateObj = new Date(timestamp);

  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();

  const _ = (nr, length = 2, padding = 0) =>
    String(nr).padStart(length, padding);

  let time = `${year}/${_(month)}/${_(date)} ${_(hour)}:${_(minute)}:${_(
    seconds
  )}`;
  return time;
};
