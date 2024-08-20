import { useState } from "react";
import LoginForm from "../Components/Login/LoginForm";
import RegistrationForm from "../Components/Register/RegistrationForm";
import { Link } from "react-router-dom";

const Login = ({ logoWhite, setUserId }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const handleRegistrationSuccess = () => {
    setShowLoginForm(true);
  };

  const links = [{ path: "/", text: "" }];

  return (
    <div className="loginPage">
      <div className="top-nav">
        <Link to="/" className="link-home">
          <img className="logoImage" src={logoWhite} alt="logo" />
        </Link>
      </div>
      {/* <Header logoWhite={logoWhite} /> */}
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
