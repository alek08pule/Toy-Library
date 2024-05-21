import Header from "../Components/Header/Header";
import Cart from "../Components/RentCart/Cart";

const CartPage = ({ logo, userId }) => {
  return (
    <>
      <Header logo={logo} />

      <Cart userId={userId} />
    </>
  );
};

export default CartPage;
