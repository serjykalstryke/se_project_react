import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ clothingItems, handleCardClick }) {
    return (
        <section className="clothes-section">
            <div className="clothes-section__button-container">
                <p>Text</p>
                <button>BUTTON</button>
            </div>
            <div className="clothes-section__cards-container">
                <ul className="clothes-section__cards-list">
					{clothingItems
						.map((item) => (
							<ItemCard
								key={item._id}
								item={item}
								onCardClick={handleCardClick}
							/>
						))}
				</ul>
            </div>
        </section>
    );
}