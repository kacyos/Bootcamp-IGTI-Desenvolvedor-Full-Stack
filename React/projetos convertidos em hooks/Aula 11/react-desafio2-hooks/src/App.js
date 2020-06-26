import React from "react";
import Countries from "./components/countries/Countries";
import Header from "./components/header/Header";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      let allCountries = await response.json();

      allCountries = allCountries.map(
        ({ name, numericCode, flag, population }) => {
          return{
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        });

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    };

    getCountries();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  };

  return (
    <div className="container">
      <h1 style={styles.title}>React Countries</h1>
      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  title: {
    textAlign: "Center",
    marginBoton: "240px",
  },
};
