import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useLogOutMutation } from "../../features/UsersSlice";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import "../Nav/Nav.css";

const Header = ({ logo, loggedIn }) => {
  const location = useLocation();
  const [LogOutMutation] = useLogOutMutation();

  const links = [
    { path: "/", text: "" },
    { path: "/CartPage", text: "" },
    { path: "/Login", text: "Login" },
    { path: "/Library", text: "Library" },
    { path: "/MyProfile", text: "My Profile" },
  ];

  const handleLogout = async () => {
    try {
      await LogOutMutation();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="main-header">
      <Link to="/">
        <img className="logoImage" src={logo} alt="logo" />
      </Link>
      <ul className="nav-link-text">
        {location.pathname === "/" && !loggedIn && (
          <li className="link-text login">
            <Link to="/Login"></Link>
          </li>
        )}
        {location.pathname === "/CartPage" && (
          <>
            <li className="link-text">
              <Link to="/Library">
                <span className="header-library-icon"></span>
              </Link>
            </li>
            <li className="link-text">
              {/* <Link to="/MyProfile">My Profile</Link> */}
              <Link to="/MyProfile" className="top-nav-icon">
                <FaUser className="my-profile-icon" />
              </Link>
            </li>
            <li className="link-text logout" onClick={handleLogout}>
              <Link to="/">
                <span className="header-logout-icon"></span>
              </Link>
            </li>
          </>
        )}
        {location.pathname === "/MyProfile" && (
          <>
            <li className="link-text">
              <Link to="/Library">
                <span className="header-library-icon"></span>
              </Link>
            </li>
            <li className="link-text logout" onClick={handleLogout}>
              <Link to="/">
                <span className="header-logout-icon"></span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
