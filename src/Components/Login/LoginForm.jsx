import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { FaLock } from "react-icons/fa";
import logo from "../../Assets/Logo2White.png";
import { IoMail } from "react-icons/io5";
import Layer_1 from "../../Assets/Layer_1.png";
import { useGetUsersQuery } from "../../features/UsersSlice";
import { useNavigate } from "react-router-dom";

function LoginForm({ toggleForm, loggedIn, setUserId }) {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: usersData, isLoading, isSuccess, isError } = useGetUsersQuery();
  useEffect(() => {
    if (isSuccess) {
      setUsers(usersData);
    }
  }, [usersData, isSuccess]);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password");

      return;
    }
    if (!isSuccess || isError || isLoading || !usersData) {
      setError("Not found");

      return;
    }
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      const loggedIn = true;
      const { id } = user;
      setUserId(id);
      navigate("/Library");
    } else {
      setError("Invalid error or password");
    }
  };

  return (
    <main>
      <div className="content">
        <div className="home-column1">
          <div className="login-image">
            <img src={Layer_1} alt="airplane" />
          </div>
        </div>
        <div className="home-column2 ">
          <div className="login_form">
            <div className="login-logoImage">
              <img className="logoImage" src={logo} alt="logo" />
            </div>
            <div className="input-box-login">
              <input
                type="text"
                placeholder="Email"
                id="email"
                autoComplete="off"
                value={email}
                onFocus={(e) => {
                  e.target.value = "";
                  setError("");
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <IoMail className="icon" />
            </div>

            <div className="input-box-login">
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onFocus={(e) => {
                  e.target.value = "";
                  setError("");
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>

            <button
              className="submit-btn-login"
              type="submit"
              onClick={handleLogin}
            >
              SUBMIT
            </button>
            {error && <div className="error">{error}</div>}
            <div className="register-link">
              <p> Don't have an account?</p>
              <p className="register-link-p" onClick={toggleForm}>
                Register
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginForm;
