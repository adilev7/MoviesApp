import { Outlet } from "react-router-dom";
import { AppProvider } from "@/store/AppProvider";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <AppProvider>
          <Outlet />
        </AppProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
