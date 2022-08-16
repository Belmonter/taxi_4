function getTime(minutes) {
  let hours = Math.trunc(minutes / 60);
  let min = Math.trunc(minutes % 60);
  if (hours) {
    return `${hours} ч. ${min} м.`
  } else {
    return `${min} мин`
  }
}

export default getTime;