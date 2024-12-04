import React from "react";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

function Sidebar({ source, setSource, destination, setDestination, cities, onSearch, routes, selectedRoute, setSelectedRoute }) {
  return (
    <Box sx={{ width: "300px", padding: 2, backgroundColor: "#f8f9fa", height: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Flight Search
      </Typography>

      {/* Display Source City */}
      <Typography variant="h6">Source City: New Delhi (DEL)</Typography>

      {/* Display Destination City */}
      <Typography variant="h6">Destination City: New York (JFK)</Typography>

      {/* Search Button */}
      <Button onClick={onSearch} variant="contained" color="primary" fullWidth>
        Search Routes
      </Button>

      {/* Displaying Routes */}
      {routes.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Available Routes</Typography>
          <List>
            {routes.map((route, index) => (
              <ListItem
                button
                key={index}
                onClick={() => setSelectedRoute(route)}  // Set the selected route
                selected={selectedRoute === route}  // Highlight selected route
              >
                <ListItemText
                  primary={`Flight: ${route.flight_number} (${route.airline})`}
                  secondary={`From: ${route.departure.city} | To: ${route.arrival.city}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
