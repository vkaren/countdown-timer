import { createContext, useState, useEffect } from "react";
import { debounce } from "@utils/debounce.js";

const AppContext = createContext({});

function AppProvider({ children }) {
  const timerStructure = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const timerProperties = Object.keys(timerStructure);
  const [timers, setTimers] = useState([]);
  const [timerTimeToAdd, setTimerTimeToAdd] = useState(timerStructure);
  const [timerNotifToAdd, setTimerNotifToAdd] = useState("");

  // useEffect(() => console.log(timers), [timers]);

  const onSettingTime = () => {
    const maxTimeValues = {
      year: 100,
      days: 365,
      hour: 24,
      minutes: 60,
      seconds: 60,
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
      const newTimer = {
        id: Math.random(),
        time: { ...timerTimeToAdd },
        initialTime: { ...timerTimeToAdd },
        notifMssg: timerNotifToAdd,
        isPaused: false,
        isOver: false,
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
