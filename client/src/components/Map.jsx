import { useEffect, useState, Fragment } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

import { SearchBar } from "./SearchBar";
import { Walr } from "./Walr";
import { WalrList } from "./WalrList";
import { NewWalr } from "./NewWalr";
import { Login } from "./Login";
import { Register } from "./Register";
import { Account } from "./Account";

import { Room as MarkerIcon } from "@mui/icons-material";
import { Tooltip, useTheme } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";
import { useFeedback } from "../providers/FeedbackProvider";

export const Map = () => {
  const { user } = useAuth();
  const { startLoading, stopLoading, displayAlert, hideAlert } = useFeedback();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [viewport, setViewport] = useState({
    latitude: null,
    longitude: null,
    zoom: 15,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [walrs, setWalrs] = useState([]);
  const [selectedWalr, setSelectedWalr] = useState(null);
  const [show, toggle] = useState({
    newWalr: false,
    walrList: false,
    login: false,
    register: false,
  });

  useEffect(() => {
    // Get user's current location and start with that position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    }
  }, []);

  useEffect(() => {
    // Fetch user's Walrs
    const getWalrs = async () => {
      try {
        startLoading();
        const response = await axios.get("/walrs", { withCredentials: true });
        setWalrs(response.data);
      } catch (error) {
        displayAlert(
          "error",
          "Cannot fetch Walrs",
          error.response.data.message
        );
      }
      stopLoading();
    };
    getWalrs();
  }, [user]);

  const handleDblClick = (event) => {
    const { lat, lng } = event.lngLat;
    setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    setSelectedLocation({ latitude: lat, longitude: lng });
    toggle((prev) => ({ ...prev, newWalr: true }));
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      onMove={(event) => {
        setViewport(event.viewState);
      }}
      mapStyle={`mapbox://styles/mapbox/${isDark ? "dark" : "light"}-v11`}
      onDblClick={handleDblClick}
      doubleClickZoom={false}
      cursor="default"
    >
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        showAccuracyCircle={true}
        trackUserLocation={true}
        showUserLocation={true}
        position="bottom-right"
      />
      <SearchBar
        viewport={viewport}
        setViewport={setViewport}
        setSelectedLocation={setSelectedLocation}
      />
      <Account toggle={toggle} />
      {
        // Display user's Walrs
        walrs?.map((walr) => (
          <Fragment key={`walr-${walr._id}`}>
            <Marker
              latitude={walr.lat}
              longitude={walr.lng}
              offsetLeft={(-viewport.zoom * 5) / 2}
              offsetTop={-viewport.zoom * 5}
              onClick={() => {
                setViewport((prev) => ({
                  ...prev,
                  latitude: walr.lat,
                  longitude: walr.lng,
                }));
                setSelectedWalr(walr);
              }}
            >
              <Tooltip title={walr.title}>
                <MarkerIcon
                  sx={{
                    fontSize: viewport.zoom * 3,
                    cursor: "pointer",
                  }}
                  color="primary"
                />
              </Tooltip>
            </Marker>
            {selectedWalr && walr._id === selectedWalr._id && (
              <Walr
                selectedWalr={selectedWalr}
                setSelectedWalr={setSelectedWalr}
                setWalrs={setWalrs}
              />
            )}
          </Fragment>
        ))
      }
      {
        // Adding new Walr
        user && show.newWalr && (
          <NewWalr
            show={show.newWalr}
            toggle={toggle}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            setWalrs={setWalrs}
          />
        )
      }
      {
        // Walr list
        show.walrList && (
          <WalrList
            show={show.walrList}
            toggle={toggle}
            walrs={walrs}
            setSelectedWalr={setSelectedWalr}
            setViewport={setViewport}
          />
        )
      }
      {
        // Login
        show.login && <Login show={show.login} toggle={toggle} />
      }
      {
        // Register
        show.register && <Register show={show.register} toggle={toggle} />
      }
    </ReactMapGL>
  );
};
