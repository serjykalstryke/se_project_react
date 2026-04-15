import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const userAvatarAlt = `${userName}'s avatar`;
  const userInitial = userName ? userName[0].toUpperCase() : "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userAvatarAlt}
            className="sidebar__user-avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}

        <span className="sidebar__username">
          {userName
            ?.split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ") || ""}
        </span>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__action-button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__action-button"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}