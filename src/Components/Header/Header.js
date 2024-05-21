import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useLogOutMutation } from "../../features/UsersSlice";

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
            <Link to="/Login">Login</Link>
          </li>
        )}
        {location.pathname === "/CartPage" && (
          <>
            <li className="link-text">
              <Link to="/Library">Library</Link>
            </li>
            <li className="link-text">
              <Link to="/MyProfile">My Profile</Link>
            </li>
            <li className="link-text logout" onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </li>
          </>
        )}
        {location.pathname === "/MyProfile" && (
          <>
            <li className="link-text">
              <Link to="/Library">Library</Link>
            </li>
            <li className="link-text logout" onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </li>
          </>
        )}
        {/* {links
          .filter((link) => link.path !== location.pathname) // Exclude the link leading to the current path
          .map((link, index) => (
            <li
              key={index}
              className={`link-text ${link.text.toLowerCase()} ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              <Link to={link.path}>{link.text}</Link>
            </li>
          ))} */}
      </ul>
    </header>
  );
};

export default Header;
