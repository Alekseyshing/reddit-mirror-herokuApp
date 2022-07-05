export function getTimePass(time: number) {
  const postTime = new Date(time * 1000);
  const nowTime = new Date().getTime();
  const hoursPass = (nowTime - (time * 1000)) / 1000 / 60 / 60
  if (hoursPass > 24) postTime.getDate();
  return Math.round(hoursPass)
}
