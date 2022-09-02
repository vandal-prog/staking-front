import React from "react";

const _ = (nr, length = 2, padding = 0) => String(nr).padStart(length, padding);

const number = ({ sec = 1 }) => {
  return <div>{_(sec)}</div>;
};

export default number;
