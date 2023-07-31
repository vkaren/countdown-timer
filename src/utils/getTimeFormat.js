import timerStructure from "@utils/timerStructure";
import timeInSeconds from "@utils/timeInSeconds";

const getTimeFormat = (timerTime) => {
  const timeFormat = { ...timerStructure };

  for (let key in timeInSeconds) {
    const time = timeInSeconds[key];

    if (timerTime >= time) {
      const convertedTime = Math.floor(timerTime / time);

      timeFormat[key] =
        convertedTime < 10 ? `0${convertedTime}` : convertedTime;
      timerTime -= convertedTime * time;
    } else if (timeFormat[key] !== undefined) {
      timeFormat[key] = "00";
    }
  }

  return Object.values(timeFormat).join(":");
};

export default getTimeFormat;
