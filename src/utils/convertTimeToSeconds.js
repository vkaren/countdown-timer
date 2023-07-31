import timeInSeconds from "@utils/timeInSeconds";

const convertTimeToSeconds = (timerTime) => {
  let timeInSecs = 0;

  for (let time in timerTime) {
    timeInSecs += timerTime[time] * timeInSeconds[time];
  }

  return timeInSecs;
};

export default convertTimeToSeconds;
