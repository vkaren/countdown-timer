import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context";
import getTimeFormat from "@utils/getTimeFormat";
import removeIcon from "@icons/icon-remove.png";
import "./styles.css";

const Timer = ({ id, initialTime, notifMessage }) => {
  const { onDeleteTimer } = useContext(AppContext);

  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(true);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    let countdownTimeout;

    if (!isPaused && !isOver) {
      countdownTimeout = setTimeout(countdown, 1000);
    }

    if (isOver) {
      const notificationMessage = notifMessage || "Timer over.";

      if (
        Notification.permission === "denied" ||
        Notification.permission === "default"
      ) {
        alert(notificationMessage);
      } else if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(notificationMessage);
        });
      }
    }

    return () => clearTimeout(countdownTimeout);
  }, [time, isPaused, isOver]);

  const countdown = () => {
    const newTime = time - 1;

    if (newTime < 0) {
      setIsPaused(true);
      setIsOver(true);
      return;
    }

    setTime(newTime);
  };

  const onStartCountdown = () => {
    setIsPaused(false);
  };

  const onPauseCountdown = () => {
    setIsPaused(true);
  };

  const onResetCountdown = () => {
    setTime(initialTime);
    setIsPaused(true);
    setIsOver(false);
  };

  return (
    <article id={id} className={"timer__container"}>
      <button onClick={onDeleteTimer} className="timer__remove">
        <img src={removeIcon} alt="Remove timer" />
      </button>

      <div className="timer__content">
        <div className="timer_current-time">
          <span>{getTimeFormat(time)}</span>
        </div>

        <div className="timer_notif-mssg">
          <span>{notifMessage}</span>
        </div>
      </div>

      {isPaused && !isOver ? (
        <div className="timer__on-pause-btn">
          <button onClick={onStartCountdown} className="timer_start-btn">
            Start
          </button>
        </div>
      ) : (
        <div className="timer__on-start-btns">
          {!isOver && (
            <button className="timer_pause-btn" onClick={onPauseCountdown}>
              Pause
            </button>
          )}
          <button className="timer_reset-btn" onClick={onResetCountdown}>
            Reset
          </button>
        </div>
      )}
    </article>
  );
};

export default Timer;
