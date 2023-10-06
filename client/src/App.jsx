import axios from "axios";
import { Map } from "./components/Map";
import { Box } from "@mui/material";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Box component="div" sx={{ height: "100vh", width: "100%" }} tabIndex={-1}>
      <Map />
    </Box>
  );
}

export default App;
