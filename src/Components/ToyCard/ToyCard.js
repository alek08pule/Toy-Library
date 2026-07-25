import "./ToyCard.css";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import formatCurrency from "../Utilities/formatCurrency";
import { useDispatch } from "react-redux";
import { useAddReactionMutation } from "../../features/ToySlice";
import { addItemToCart } from "../../features/CartSlice";
import { useState } from "react";

const ToyCard = ({ item }) => {
  const dispatch = useDispatch();
  const [addReaction] = useAddReactionMutation();
  const [heartCount, setHeartCount] = useState(item.reactions?.heart || 0);

  const handleHeartClick = async () => {
    try {
      const newHeartCount = heartCount + 1;
      await addReaction({
        toysId: item.Id,
        reactions: { heart: newHeartCount },
      }).unwrap();
      setHeartCount(newHeartCount);
    } catch (error) {
      console.error("Failed to update reactions: ", error);
    }
  };

  return (
    <div className="category-card">
      <div className="toy-image" key={item.Id}>
        <img src={item.ImageUrl} alt={item.Name} />
      </div>
      <div className="info">
        <div className="toy-name">{item.Name}</div>
        <div className="toy-description">{item.Description}</div>
        <div className="card-text-wrapper">
          <div className="toy-price">
            Price: {formatCurrency({ number: item.Price })}{" "}
          </div>
          <button
            className="icon-btn add-to-cart"
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
          </button>
        </div>

        <button className="icon-btn favorite" onClick={handleHeartClick}>
          <FaHeart /> {heartCount}
        </button>
      </div>
    </div>
  );
};
export default ToyCard;
