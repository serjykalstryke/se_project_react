import "./ToggleSwitch.css";
import { useCurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch({ className }) {
	const { currentTemperatureUnit, handleToggleSwitchChange } = useCurrentTemperatureUnit();

	return (
		<label className={`toggle-switch ${className || ""}`} htmlFor={`toggle-switch`}>
			<input
				checked={currentTemperatureUnit === "C"}
				onChange={handleToggleSwitchChange}
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
