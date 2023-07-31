import { createContext, useState, useEffect } from "react";
import timerStructure from "@utils/timerStructure";
import debounce from "@utils/debounce";
import convertTimeToSeconds from "@utils/convertTimeToSeconds";
import getTimeFormat from "@utils/getTimeFormat";

const AppContext = createContext({});

function AppProvider({ children }) {
  const timerProperties = Object.keys(timerStructure);
  const [timers, setTimers] = useState([]);
  const [timerTimeToAdd, setTimerTimeToAdd] = useState(timerStructure);
  const [timerNotifToAdd, setTimerNotifToAdd] = useState("");

  const onSettingTime = () => {
    const maxTimeValues = {
      year: 10,
      month: 12,
      week: 4,
      day: 7,
      hour: 24,
      minute: 60,
      second: 60,
    };

    const setTime = (e) => {
      const timeType = e.target.id;
      const timeValue = e.target.value - "";
      const isANumber = !isNaN(timeValue);
      const canSetTime =
        timeValue < maxTimeValues[timeType] ||
        timerProperties.indexOf(timeType) === 0;

      if (isANumber && canSetTime) {
        setTimerTimeToAdd({
          ...timerTimeToAdd,
          [timeType]: timeValue,
        });
      } else {
        console.log("error");

        if (timerTimeToAdd[timeType]) {
          setTimerTimeToAdd({
            ...timerTimeToAdd,
            [timeType]: 0,
          });
        }
      }
    };

    return debounce(setTime, 200);
  };

  const onSettingNotifMssg = () => {
    const setNotif = (e) => {
      const notifValue = e.target.value;
      setTimerNotifToAdd(notifValue);
    };

    return debounce(setNotif, 200);
  };

  const onAddTimer = (e) => {
    e.preventDefault();
    const isATimerTime = Math.max(...Object.values(timerTimeToAdd)) > 0;

    if (isATimerTime) {
      const timerTimeInSecs = convertTimeToSeconds(timerTimeToAdd);
      const newTimer = {
        id: Math.random(),
        initialTime: timerTimeInSecs,
        initialTimeFormat: getTimeFormat(timerTimeInSecs),
        notifMssg: timerNotifToAdd,
      };

      setTimers([...timers, newTimer]);
    }
  };

  const onDeleteTimer = (e) => {
    const timerIdToDelete = e.currentTarget.parentElement.id;
    const newTimers = timers.filter(
      (timer) => timer.id !== timerIdToDelete - ""
    );

    setTimers(newTimers);
  };

  return (
    <AppContext.Provider
      value={{
        timerProperties,
        timers,
        onSettingTime,
        onSettingNotifMssg,
        onAddTimer,
        onDeleteTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
