import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Send from "./components/Send";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/send"
          element={<Send firstName="Mohammad" lastName="Jagora" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
