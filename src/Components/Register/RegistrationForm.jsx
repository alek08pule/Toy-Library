import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Register/RegisterForm.css";
import { useState } from "react";
import { useAddUserMutation } from "../../features/UsersSlice";
import { v4 as uuidv4 } from "uuid";

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
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="register-form">
          <div className="register-form-left">
            <div className="input-box-register">
              <label htmlFor="fullName">Full Name</label>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Full Name"
                  id="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box-register">
              <label htmlFor="email">Email address</label>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box-register">
              <label htmlFor="password">Password</label>
              <div className="inputs">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
            </div>

            <div className="input-box-register">
              <label htmlFor="confirm_pwd">Confirm Password</label>
              <div className="inputs">
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="Confirm_pwd"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className="icon" />
              </div>
            </div>
          </div>
          <div className="register-form-right">
            <div className="input-box-register">
              <label htmlFor="PayCard">Paycard</label>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Paycard"
                  id="PayCard"
                  onChange={(e) => setPayCard(e.target.value)}
                />
              </div>
            </div>

            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="already_have_account">
        <p> Already have an account.</p>
        <p onClick={toggleForm}>Login</p>
      </div>
    </div>
  );
}

export default RegistrationForm;
