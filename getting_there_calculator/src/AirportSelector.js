import React, { useState, useEffect } from "react";

function AirportSelector({ label, onChange }) {
  const [airports, setAirports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch airports on load
    const fetchAirports = async () => {
      const API_KEY = "e6debd445de434681692cfd7b0893259";
      const url = `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setAirports(data.data || []); // Store airport list
    };
    fetchAirports();
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>{label}</label>
      <input
        type="text"
        value={search}
        placeholder="Search airport"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <select onChange={(e) => onChange(e.target.value)} style={{ width: "100%" }}>
        <option value="">Select an airport</option>
        {airports
          .filter((airport) =>
            airport.airport_name.toLowerCase().includes(search) ||
            airport.iata_code.toLowerCase().includes(search)
          )
          ?.map((airport) => (
            <option key={airport.iata_code} value={airport.iata_code}>
              {airport.airport_name} ({airport.iata_code}) - {airport.country_name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default AirportSelector;
