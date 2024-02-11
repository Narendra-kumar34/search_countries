import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(0);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const fetchData = async () => {
    try {
      let response = await axios.get(`https://restcountries.com/v3.1/all`);
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (err) {
      console.log("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }
    let timer = setTimeout(() => {
      if (search === "") {
        fetchData();
      } else {
        const filtered = countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCountries(filtered);
      }
    }, 500);
    setDebounceTimer(timer);
  }, [search]);

  const card = {
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const container = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="App">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={container}>
        {filteredCountries.map((country) => (
          <div style={card} key={country.name.common} className="countryCard">
            <img
              src={country.flags?.png}
              alt={country.name.common}
              style={imageStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
