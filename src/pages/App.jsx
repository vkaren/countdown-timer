import { AppProvider } from "@context";
import AddTimerForm from "@components/AddTimerForm";
import TimersContainer from "@components/TimersContainer";
import "./styles.css";

const App = () => {
  return (
    <AppProvider>
      <h1>Countdown timer</h1>
      <AddTimerForm />
      <TimersContainer />
    </AppProvider>
  );
};

export default App;
