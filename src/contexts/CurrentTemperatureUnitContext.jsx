import {createContext, useContext} from 'react';

const CurrentTemperatureUnitContext = createContext();

export const CurrentTemperatureUnitProvider = ({ children, currentTemperatureUnit, handleToggleSwitchChange }) => {
    return (
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
            {children}
        </CurrentTemperatureUnitContext.Provider>
    );
};

export const useCurrentTemperatureUnit = () => {
    return useContext(CurrentTemperatureUnitContext);
}; 

