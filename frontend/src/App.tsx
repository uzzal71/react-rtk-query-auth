import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import ProtectedRoute from "./components/ProtectedRoute";
import { selectAuth } from "./features/authSlice";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const { token } = useAppSelector(selectAuth);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={token?.length ? "/dashboard" : "/login"} replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
