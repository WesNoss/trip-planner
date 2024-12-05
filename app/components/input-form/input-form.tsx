"use client";

import React, { useState } from "react";
import style from "./page.module.css";
import { handleFormSubmit } from "../../utils/form-helpers";
import CityDropdown from "./../city-dropdown/city-dropdown"

type InputFormProps = {};

const InputForm: React.FC<InputFormProps> = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // setResult(null);

    handleFormSubmit(
      { origin, destination, startDate, endDate },
      (data) => console.log(data),
      (errorMessage) => setError(errorMessage)
    );
  };


  return (
    <form onSubmit={handleSubmit} className={style.inputForm}>
      {/* Starting Point Input with Dropdown */}
      <div className={style.inputGroup}>
        <div className="flex-row">
          <CityDropdown
            city={origin} 
            label="origin" 
            setCity={setOrigin} 
            placeholder="From?">
          </CityDropdown>
          <CityDropdown 
            city={destination}
            label="destination"
            setCity={setDestination}
            placeholder="To?">
          </CityDropdown>
        </div>

        <div className="flex-row">
          {/* Start Date Input */}
          <div>
            <input
              type="date"
              id="startDate"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value || undefined)}
            />
          </div>
          {/* End Date Input */}
          <div>
            <input
              type="date"
              id="endDate"
              placeholder="until"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value || undefined)}
            />
          </div>
        </div>
      </div>
      

      {/* Submit Button */}
      <button type="submit" className={style.submitButton}>Explore</button>

      { error && (
        <div className={`${style.errorMessage} flex-row`}>
          {error}
          <div className="style.dismissX" onClick={() => {setError(null)}}>x</div>
        </div>
      )}
    </form>
  );
};

export default InputForm;
