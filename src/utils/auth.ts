const TOKEN_TIME = "tokentime";
const TOKEN_TIME_VALUE = 24 * 60 * 60 * 1000; //24h

export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now().toString());
};

export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME);
};

export const IsTokenExpired = () => {
  const curTime = Date.now();
  const tokentime = getTokenTime();
  return curTime > Number(tokentime) + TOKEN_TIME_VALUE;
};
