import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/loginApi";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [login, { isLoading, isError, error, data, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message, user, token } = await login(loginInfo).unwrap();

      // Success handling
      handleSuccess(message);
      Cookies.set("user", JSON.stringify(user));
      Cookies.set("token", token);
      navigate("/dashboard");
    } catch (err: any) {
      // Error handling
      handleError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email"
            onChange={handleChange}
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
            value={loginInfo.password}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
