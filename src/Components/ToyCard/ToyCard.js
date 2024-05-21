import "./ToyCard.css";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import formatCurrency from "../Utilities/formatCurrency";
import { useDispatch } from "react-redux";

import { addItemToCart } from "../../features/CartSlice";

const ToyCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="category-card">
      <div className="toy-image" key={item.Id}>
        <img src={item.ImageUrl} alt={item.Name} />
      </div>
      <div className="info">
        <div className="toy-name">{item.Name}</div>
        <div className="toy-description">{item.Description}</div>
        <div className="toy-price">
          Price: {formatCurrency({ number: item.Price })}{" "}
        </div>
        <div className="icons">
          <button className="icon-btn">
            <FaHeart />
          </button>
          <button
            className="icon-btn"
            onClick={() =>
              dispatch(
                addItemToCart({
                  id: item.Id,
                  name: item.Name,
                  imageUrl: item.ImageUrl,
                  price: item.Price,
                })
              )
            }
          >
            Add to card
            <FaCartArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ToyCard;
