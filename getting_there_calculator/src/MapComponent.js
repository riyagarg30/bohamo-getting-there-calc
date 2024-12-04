import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { SvgIcon } from "@mui/material"; // Import SvgIcon from MUI
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Import LocationOnIcon
import "leaflet/dist/leaflet.css";

// MUI Icon as a Custom Marker
const CustomLocationMarkerIcon = () => (
  <SvgIcon
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    sx={{
      width: 30,
      height: 30,
      fill: "red", // Color of the marker
    }}
  >
    <LocationOnIcon />
  </SvgIcon>
);

function MapComponent({ routes }) {
  const markersRef = useRef({});

  // Function to generate random color for each route
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <MapContainer
      center={[28.5721, 77.0369]} // Start with New Delhi coordinates
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Base Map Tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Flight Markers */}
      {routes.map((route, index) => {
        const routeColor = getRandomColor(); // Generate random color for each route

        return (
          <React.Fragment key={index}>
            {/* Marker for Departure (New Delhi) */}
            <Marker
              position={[route.departure.latitude, route.departure.longitude]}
              icon={new L.DivIcon({
                className: "leaflet-div-icon", // Add custom class for styling
                html: `<div style="color: red;">${CustomLocationMarkerIcon()}</div>`, // Use custom MUI icon here
              })}
            >
              <Popup>
                <strong>{route.airline}</strong> - {route.flight_number}
                <br />
                From: New Delhi (DEL)
              </Popup>
            </Marker>

            {/* Marker for Arrival (New York) */}
            <Marker
              position={[route.arrival.latitude, route.arrival.longitude]}
              icon={new L.DivIcon({
                className: "leaflet-div-icon", // Add custom class for styling
                html: `<div style="color: green;">${CustomLocationMarkerIcon()}</div>`, // Use custom MUI icon here
              })}
            >
              <Popup>
                <strong>{route.airline}</strong> - {route.flight_number}
                <br />
                To: New York (JFK)
              </Popup>
            </Marker>

            {/* Polyline for the Route */}
            <Polyline
              positions={[
                [route.departure.latitude, route.departure.longitude],
                [route.arrival.latitude, route.arrival.longitude],
              ]}
              color={routeColor} // Apply random color to each route
              weight={4}
              opacity={0.7}
            />

            {/* If there is a connection, draw dashed lines between stops */}
            {route.connection && (
              <React.Fragment>
                {/* Polyline for Connection (Dashed Line) */}
                <Polyline
                  positions={[
                    [route.connection.departure.latitude, route.connection.departure.longitude],
                    [route.connection.arrival.latitude, route.connection.arrival.longitude],
                  ]}
                  color="black"
                  dashArray="5,5" // Dashed line for connection
                  weight={3}
                  opacity={0.7}
                />
                {/* Markers for Connection Stops */}
                <Marker
                  position={[route.connection.departure.latitude, route.connection.departure.longitude]}
                  icon={new L.DivIcon({
                    className: "leaflet-div-icon",
                    html: `<div style="color: blue;">${CustomLocationMarkerIcon()}</div>`, // Use custom MUI icon here
                  })}
                >
                  <Popup>
                    <strong>{route.connection.airline}</strong> - {route.connection.flight_number}
                    <br />
                    From: {route.connection.departure.city} (Connection)
                  </Popup>
                </Marker>

                <Marker
                  position={[route.connection.arrival.latitude, route.connection.arrival.longitude]}
                  icon={new L.DivIcon({
                    className: "leaflet-div-icon",
                    html: `<div style="color: blue;">${CustomLocationMarkerIcon()}</div>`, // Use custom MUI icon here
                  })}
                >
                  <Popup>
                    <strong>{route.connection.airline}</strong> - {route.connection.flight_number}
                    <br />
                    To: {route.connection.arrival.city} (Connection)
                  </Popup>
                </Marker>
              </React.Fragment>
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
