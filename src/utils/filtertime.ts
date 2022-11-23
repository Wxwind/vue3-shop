import dayjs from "dayjs";

export const filterTimes = (val: string, format = "YYYY-MM-DD") => {
  if (!isNull(val)) {
    const num = parseInt(val) * 1000;
    return dayjs(num).format(format);
  } else {
    return "--";
  }
};

export const isNull = (date: string) => {
  if (!date) return true;
  const a = JSON.stringify(date);
  if (a === "{}" || a === "[]") return true;
  return false;
};
