import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MapComponent from "./MapComponent";
import { fetchCities, fetchRoutes } from "./utils/api";

function App() {
  const [source, setSource] = useState("DEL"); // New Delhi (DEL) as source IATA code
  const [destination, setDestination] = useState("JFK"); // New York (JFK) as destination IATA code
  const [cities, setCities] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    async function loadCities() {
      const data = await fetchCities();
      setCities(data);
    }
    loadCities();
  }, []);

  // Handle search when user clicks search button
  const handleSearch = async () => {
    if (source && destination) {
      const data = await fetchRoutes(source, destination);
      setRoutes(data);  // Set the list of routes returned from the API
      setSelectedRoute(null); // Reset selected route on new search
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
        cities={cities}
        onSearch={handleSearch}
        routes={routes} 
        selectedRoute={selectedRoute} 
        setSelectedRoute={setSelectedRoute} 
      />
      <MapComponent routes={routes} selectedRoute={selectedRoute} />
    </div>
  );
}

export default App;
