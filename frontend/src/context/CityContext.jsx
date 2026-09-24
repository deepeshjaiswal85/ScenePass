import React, { createContext, useContext, useState, useEffect } from 'react';

const CityContext = createContext();

export const CITIES = [
  { name: 'Jaipur', label: 'Jaipur', icon: '🏛️' },
  { name: 'Delhi', label: 'Delhi NCR', icon: '🕌' },
  { name: 'Mumbai', label: 'Mumbai', icon: '🌊' },
  { name: 'Bengaluru', label: 'Bengaluru', icon: '💻' },
  { name: 'Hyderabad', label: 'Hyderabad', icon: '🏰' },
  { name: 'Pune', label: 'Pune', icon: '🏞️' },
  { name: 'Chennai', label: 'Chennai', icon: '🌴' }
];

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('scenepass_city') || 'Jaipur';
  });

  const changeCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem('scenepass_city', city);
  };

  return (
    <CityContext.Provider value={{ selectedCity, changeCity, CITIES }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
