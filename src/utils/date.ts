import config from "./config";

// function for check with regex if the date is in the correct format 1900-01-01T00:00:00
export const checkDate = (date: string) => {
  for (let i = 0; i < config.dateRegex.length; i++) {
    const regex = new RegExp(config.dateRegex[i]);
    if (regex.test(date)) {
      return true;
    }
  }
  return false;
};

export const transformDate = (d: string | number) => {
  if (checkDate(d.toString())) {
    const date = new Date(d);
    const returndate = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
    ].join("/");
    return returndate;
  }
  return d;
};
