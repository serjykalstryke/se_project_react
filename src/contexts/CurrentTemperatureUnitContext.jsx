import {createContext, useState, useContext} from 'react';

const CurrentTemperatureUnitContext = createContext();

export const CurrentTemperatureUnitProvider = ({ children }) => {
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

    return (
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}>
            {children}
        </CurrentTemperatureUnitContext.Provider>
    );
};

export const useCurrentTemperatureUnit = () => {
    return useContext(CurrentTemperatureUnitContext);
}; 

