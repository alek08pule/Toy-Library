import { Link, useNavigate } from "react-router-dom";
import CategoryButton from "../CategoryButton/CategoryButton";
import SearchForm from "../SearchForm/SearchForm";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import "../Nav/Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogOutMutation } from "../../features/UsersSlice";
import { TbLogout2 } from "react-icons/tb";
import { clearCart } from "../../features/CartSlice";
import { useState } from "react";

const Nav = ({
  logo,
  search,
  setSearch,
  buttons,
  handleCategoryClick,
  userId,
}) => {
  const CartCounter = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [logoutUser] = useLogOutMutation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      setError("Logout failed");
    }
  };
  const handleCartClick = () => {
    navigate("/CartPage", { state: { userId } });
  };
  return (
    <nav className="library-nav">
      <div className="searchNav">
        <Link to="/">
          <img src={logo} alt="logo" className="logoImage" />
        </Link>

        <SearchForm search={search} setSearch={setSearch} />
        <div className="link-icons">
          <div className="rent-card-icon" onClick={handleCartClick}>
            <div className="shop-card-icon top-nav-icon">
              <FaCartShopping />
            </div>
            <div className="cart-counter">{CartCounter.length}</div>
          </div>

          <Link to="/MyProfile" className="top-nav-icon">
            <FaUser className="my-profile-icon" />
          </Link>
          <Link to="/" className="top-nav-icon">
            <span className="header-logout-icon" onClick={handleLogout}></span>
          </Link>
          <div>{error}</div>
        </div>
      </div>
      <div className="categoryNav">
        <CategoryButton
          buttons={buttons}
          handleCategoryClick={handleCategoryClick}
        />
      </div>
    </nav>
  );
};

export default Nav;
