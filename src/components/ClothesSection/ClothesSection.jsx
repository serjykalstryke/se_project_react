import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
    return (
        <section className="clothes-section">
            <div className="clothes-section__button-container clothes-section__your-items">
                <p>Your Items</p>
                <button className="clothes-section__add-button" onClick={handleAddClick}>+ Add New</button>
            </div>
            <div className="clothes-section__cards-container">
                <ul className="clothes-section__cards-list">
					{clothingItems
						.map((item) => (
							<ItemCard
								key={item._id}
								item={item}
								handleCardClick={handleCardClick}
							/>
						))}
				</ul>
            </div>
        </section>
    );
}