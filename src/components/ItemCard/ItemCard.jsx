import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const onCardClick = () => {
    handleCardClick(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          />
        )}
      </div>

      <img
        className="card__image"
        onClick={onCardClick}
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;