import { AppProvider } from "@context";
import { Suspense, lazy } from "react";
import "./styles.css";

const AddTimerForm = lazy(() => import("../components/AddTimerForm"));
const TimersContainer = lazy(() => import("../components/TimersContainer"));

const App = () => {
  return (
    <AppProvider>
      <h1>Countdown timer</h1>
      <Suspense>
        <AddTimerForm />
        <TimersContainer />
      </Suspense>
    </AppProvider>
  );
};

export default App;
