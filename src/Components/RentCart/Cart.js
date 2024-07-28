import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart } from "../../features/CartSlice";
import formatCurrency from "../Utilities/formatCurrency";
import "./Cart.css";
import { useState, useEffect, useId } from "react";
import { useAddRentMutation } from "../../features/RentsSlice";
import {
  useAddUserRentsMutation,
  useUpdateUserRentsMutation,
  useGetUserRentsQuery,
} from "../../features/UsersSlice";
import { v4 as uuidv4 } from "uuid";

const Cart = ({ userId }) => {
  const rentCart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [addRent, { isLoading }] = useAddRentMutation();
  const [rentSuccessMessage, setRentSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addUserRents] = useAddUserRentsMutation();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItemFromCart({ id: itemId }));
  };
  console.log(userId);
  useEffect(() => {
    let totalSum = 0;
    rentCart.forEach((item) => {
      totalSum += item.price;
    });
    setTotalPrice(totalSum);
  }, [rentCart]);

  const handleRentToys = async () => {
    if (isLoading) return;
    try {
      const rentId = uuidv4();
      const newRent = {
        id: rentId,
        userId,
        date: new Date().toISOString(),
        toys: rentCart,
        isPaid: true,
      };

      await addRent(newRent);
      dispatch(clearCart());
      setRentSuccessMessage("Toys rented successfully!");
    } catch (error) {
      setErrorMessage("Failed to rent toys. Please try again later.");
    }
  };

  return (
    <main>
      {rentCart.length > 0 ? (
        <div className="cart-list">
          {rentCart.map((item) => (
            <div className="rent_cart" key={item.id}>
              <div className="toy-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className="info">
                <div className="toy-name">{item.name}</div>

                <div className="price-wrapper">
                  <div className="toy-price">
                    Price: {formatCurrency({ number: item.price })}
                  </div>
                  <div className="icons">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="footer-buttons">
            <div className="total-price">
              <span className="total">
                Total amount: {formatCurrency({ number: totalPrice })}
              </span>
            </div>
            <div className="rent-btn">
              <button onClick={handleRentToys} disabled={isLoading}>
                Rent the toys
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="msg">
          {rentSuccessMessage ? (
            <div className="success-message">{rentSuccessMessage}</div>
          ) : errorMessage ? (
            <div className="error-message">{errorMessage}</div>
          ) : (
            <div>No items in cart</div>
          )}
        </div>
      )}
    </main>
  );
};
export default Cart;
