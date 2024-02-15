import { createContext, useState, useEffect } from "react";
import timerStructure from "@utils/timerStructure";
import convertTimeToSeconds from "@utils/convertTimeToSeconds";

const AppContext = createContext({});

function AppProvider({ children }) {
  const timerProperties = Object.keys(timerStructure);
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          Notification.requestPermission();
        })
        .catch((err) => new Error(err));
    }
  }, []);

  const addTimer = ({ timer, notifMssg }) => {
    const timerValues = Object.values(timer);
    const isValidTimer =
      !timerValues.includes(NaN) && Math.max(...timerValues) > 0;

    if (isValidTimer) {
      const timerTimeInSecs = convertTimeToSeconds(timer);
      const newTimer = {
        id: Math.random(),
        initialTime: timerTimeInSecs,
        notifMssg,
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
        addTimer,
        onDeleteTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
