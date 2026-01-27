import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
	const userName = "Terrence Tegegne";
	const userAvatarAlt = `${userName}'s avatar`;
	const userAvatar = avatar;

	return (
		<aside className="sidebar">
			<div className="sidebar__user-container">
				<img
					src={userAvatar}
					alt={userAvatarAlt}
					className="sidebar__user-avatar"
				/>
				<span className="sidebar__username sidebar__username_none">
					{userName
						?.split(" ")
						.map(
							(word) =>
								word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
						)
						.join(" ") || ""}
				</span>
			</div>
		</aside>
	);
}
