import AddTimerForm from "@components/AddTimerForm";
import TimersContainer from "@components/TimersContainer";
import "./styles.css";

const App = () => {
  const timerFormInputs = ["hours", "minutes", "seconds"];
  return (
    <>
      <h1>Countdown timer</h1>
      <AddTimerForm timerFormInputs={timerFormInputs} />
      <TimersContainer />
    </>
  );
};

export default App;
