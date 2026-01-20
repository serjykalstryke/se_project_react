import "./header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ onAddClothesClick, location = "New York" }) {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});

	return (
		<header className="header">
				<img src={logo} alt="wtwr logo" className="header__logo" />
				<p className="header__date-and-location">Date & Location</p>
				<button className="header__add-clothes-btn">+ Add Clothes</button>
			<div className="header__user-container">
				<p className="header__user-name">Terrence Tegegne</p>
				<img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
			</div>
		</header>
	);
}

export default Header;
