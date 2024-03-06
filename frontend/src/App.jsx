import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Send from "./components/Send";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const BASE_URI = "http://localhost:3000/api/v1";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send/:to" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
