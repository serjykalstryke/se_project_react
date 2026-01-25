import "./ToggleSwitch.css";

export default function ToggleSwitch({ isOn, handleToggle, className }) {
	return (
		<label className={`toggle-switch ${className || ""}`} htmlFor={`toggle-switch`}>
			<input
				checked={isOn}
				onChange={handleToggle}
				className="toggle-switch__checkbox"
				id={`toggle-switch`}
				type="checkbox"
			/>
			<span className="toggle-switch__slider" />
			<span className="toggle-switch__text toggle-switch__text_F">F</span>
			<span className="toggle-switch__text toggle-switch__text_C">C</span>
		</label>
	);
}
