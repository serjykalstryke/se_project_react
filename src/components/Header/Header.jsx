import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  currentUser,
  onLoginClick,
  onRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const userAvatarAlt = `${userName}'s avatar`;
  const userInitial = userName ? userName[0].toUpperCase() : "";

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch className="header__toggle" />

      {isLoggedIn ? (
        <>
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

              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userAvatarAlt}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {userInitial}
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__auth-btn"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__auth-btn"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;