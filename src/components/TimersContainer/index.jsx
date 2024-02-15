import { useContext } from "react";
import { AppContext } from "@context";
import Timer from "../Timer";
import "./styles.css";

const TimersContainer = () => {
  const { timers } = useContext(AppContext);

  return (
    <section className="timers__section">
      {timers.map((timer, i) => (
        <Timer
          key={timer.id}
          id={timer.id}
          initialTime={timer.initialTime}
          notifMessage={timer.notifMssg}
        />
      ))}
    </section>
  );
};

export default TimersContainer;
