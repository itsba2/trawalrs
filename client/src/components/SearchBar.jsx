import { useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const SearchBar = ({ setViewport, setSelectedLocation }) => {
  const [searchResults, setSearchResults] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleInputChange = async (event, string, reason) => {
    // TODO: Show better search results
    if (reason === "reset") {
      setSearchResults([]);
    } else if (reason === "input") {
      const searchResults = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${
          import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        }`
      );
      setSearchResults(searchResults.data.features);
    }
  };

  const handleSelect = (event, value, reason, details) => {
    if (reason === "selectOption") {
      const [lng, lat] = value?.geometry.coordinates;
      setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      setSelectedLocation(value);
    } else if (reason === "clear") {
      setSelectedLocation(null);
    }
  };

  return (
    <Autocomplete
      options={searchResults}
      getOptionLabel={(option) => option.place_name}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      onInputChange={handleInputChange}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a location"
          autoFocus
          sx={{ backgroundColor: theme.palette.background.default }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
      clearOnEscape
      autoHighlight
      sx={{
        position: "absolute",
        top: 10,
        right: isMobile ? 10 : "calc(50% - 225px)",
        width: isMobile ? 280 : 450,
        backgroundColor: "white",
      }}
    />
  );
};
