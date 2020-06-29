const { getTime } = require("date-fns")

//Unique ID Gen
const createUUID = (type) => {
  const currentTime = new Date().getTime().toString(16);
  const rngStr = (Math.random().toString(16)+'00000000').substr(2, 8);
  return `${type}-${currentTime}-${rngStr}`;
};

export default createUUID;
