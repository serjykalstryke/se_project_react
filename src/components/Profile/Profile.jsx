import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

export default function Profile({ clothingItems, weatherData, handleCardClick, handleAddClick }) {
    return (
        <main className="profile">
            <SideBar />
            <ClothesSection  clothingItems={clothingItems} weatherData={weatherData} handleCardClick={handleCardClick} handleAddClick={handleAddClick} />
        </main>
    );
}