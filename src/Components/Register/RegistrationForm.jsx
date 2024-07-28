import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { useState } from "react";
import { useAddUserMutation } from "../../features/UsersSlice";
import { v4 as uuidv4 } from "uuid";
import heroImage from "../../Assets/Layer_1.png";
import logoWhite from "../../Assets/Logo2White.png";

function RegistrationForm({ toggleForm, onRegistrationSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [payCard, setPayCard] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

  const clearInputs = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPayCard("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const userId = uuidv4();
      const newUser = {
        userId,
        fullName,
        email,
        password,
        payCard,
      };

      await addUser(newUser);
      clearInputs();
      setErrorMessage("");
      if (typeof onRegistrationSuccess === "function") {
        onRegistrationSuccess();
      }
    } catch (error) {
      setErrorMessage("Failed to register. Please try again later.");
    }
    navigate("/");
  };

  return (
    <main>
      <div className="content">
        <div className="home-column1">
          <div className="login-image">
            <img src={heroImage} alt="airplane" />
          </div>
        </div>
        <div className="home-column2">
          <div className="login_form">
            <div className="login-logoImage">
              <img className="logoImage" src={logoWhite} alt="logo" />
            </div>
            <div className="input-box-login">
              <label htmlFor="fullName">Full Name</label>

              <input
                type="text"
                placeholder="Full Name"
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box-login">
              <label htmlFor="email">Email address</label>

              <input
                type="text"
                placeholder="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box-login">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>

            <div className="input-box-login">
              <label htmlFor="confirm_pwd">Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm password"
                id="Confirm_pwd"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <button
              className="submit-btn-register"
              type="submit"
              onSubmit={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="already_have_account">
              <p> Already have an account.</p>
              <p className="login-link-p" onClick={toggleForm}>
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegistrationForm;
