import Timer from "../Timer";
import "./styles.css";

const TimersContainer = () => {
  return (
    <section className="timers__section">
      {/* {timers.map((timer, i) => (
        <Timer
          key={i}
          time={timer.time}
          notifMessage={timer.notifMessage}
          isPaused={timer.isPaused}
          isOver={timer.isOver}
        />
      ))} */}
    </section>
  );
};

export default TimersContainer;
