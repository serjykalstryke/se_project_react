import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
	handleAddClick,
	weatherData,
	handleToggleSwitchChange,
	currentTemperatureUnit,
}) {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});

	const userName = "Terrence Tegegne";
	const userAvatarAlt = `${userName}'s avatar`;
	const userAvatar = avatar;

	return (
		<header className="header">
			<NavLink to="/dashboard" className="header__logo-link">
				<img src={logo} alt="wtwr logo" className="header__logo" />
			</NavLink>
			<p className="header__date-and-location">
				{currentDate}, {weatherData.city}
			</p>
			<ToggleSwitch
				className="header__toggle"
				isOn={currentTemperatureUnit === "C"}
				handleToggle={handleToggleSwitchChange}
			/>
			<button
				type="button"
				onClick={handleAddClick}
				className="header__add-clothes-btn"
			>
				+ Add Clothes
			</button>
			<NavLink to="/profile" className="header__nav-link">
				<div className="header__user-container">
					<p className="header__user-name">{userName}</p>
					<img
						src={userAvatar}
						alt={userAvatarAlt}
						className="header__avatar"
					/>
				</div>
			</NavLink>
		</header>
	);
}

export default Header;
