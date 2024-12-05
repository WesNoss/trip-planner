import React, { useState } from "react";
import style from "./page.module.css";
// Sample list of US cities (you can replace this with a more extensive list or API call)
const US_CITIES = [
    "New York",
    "Los Angeles",
    "Chicago"
  ];

type CityDropdownProps = {
    city: string;
    label: string;
    placeholder: string;
    setCity: (value: string) => void;
}

const CityDropdown: React.FC<CityDropdownProps> = ({
    city,
    label,
    placeholder,
    setCity
}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredCities, setFilteredCities] = useState<string[]>([]);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setCity(input);
    
        // Filter cities based on input
        if (input.trim() === "") {
          setFilteredCities(US_CITIES);
          setDropdownVisible(true);
        } else {
          const matches = US_CITIES.filter((city) =>
            city.toLowerCase().includes(input.toLowerCase())
          );
          setFilteredCities(matches);
          setDropdownVisible(matches.length > 0);
        }
      };
    
      const handleCitySelect = (city: string) => {
        setCity(city);
        setDropdownVisible(false);
      };

    return (
        <div className={style.autocomplete}>
          <input
            type="text"
            id={label}
            value={city}
            className={style.textInput}
            onChange={handleCityChange}
            placeholder={placeholder}
            required
          />
          {dropdownVisible && (
            <ul className={style.dropdown}>
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className={style.dropdownItem}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
    )
}

export default CityDropdown;