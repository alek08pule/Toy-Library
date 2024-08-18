import { useState } from "react";
import Header from "../Components/Header/Header";
import LoginForm from "../Components/Login/LoginForm";
import RegistrationForm from "../Components/Register/RegistrationForm";
import Footer from "../Components/Footer";

const Login = ({ logoWhite, setUserId }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const handleRegistrationSuccess = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="loginPage">
      <Header logoWhite={logoWhite} />
      {/* <main className="main-login"></main> */}
      {showLoginForm ? (
        <LoginForm toggleForm={toggleForm} setUserId={setUserId} />
      ) : (
        <RegistrationForm
          toggleForm={toggleForm}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
