import axios from "axios";
import { Map } from "./components/Map";
import { Box, CssBaseline } from "@mui/material";
import { Fragment } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Fragment>
      <CssBaseline enableColorScheme />
      <Box
        component="div"
        sx={{ height: "100vh", width: "100%" }}
        tabIndex={-1}
      >
        <Map />
      </Box>
    </Fragment>
  );
}

export default App;
