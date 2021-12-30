// Imports from packages
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl';
// import mapboxgl from 'mapbox-gl';
import { Star, StarBorder, Room, Delete } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { format } from 'timeago.js';
import FileBase from 'react-file-base64';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// Imports from folders
import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import walrusLogo from './images/walrus.png';

// /* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
// mapboxgl.workerClass =
//   require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
// /* eslint-enable import/no-webpack-loader-syntax, import/no-unresolved */

const App = () => {
  // Define states
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '97vh',
    latitude: 51.477928,
    longitude: 0,
    zoom: 5,
  });
  const myStorage = window.localStorage;
  const [walrs, setWalrs] = useState([]);
  const [currentWalrId, setCurrentWalrId] = useState(null);
  const [newWalr, setNewWalr] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'));
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  // Fetch all walrs on page load
  useEffect(() => {
    const getWalrs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/walrs");
        setWalrs(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getWalrs();
  }, []);

  // Handle functions
  const handleWalrClick = (id, lat, long) => {
    setCurrentWalrId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 10 });
  };

  const handleNewWalr = (e) => {
    const [long, lat] = e.lngLat;
    setNewWalr({
      lat,
      long,
    });
  };

  const handleDeleteWalr = async (e) => {
    try {
      setLoading(true);
      await axios.delete(`/walrs/${currentWalrId}`);
      setLoading(false);
      setCurrentWalrId(null);
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRating = (e, newRating) => setRating(newRating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postNewWalr = {
      username: currentUser,
      title,
      desc,
      rating,
      photo,
      lat: newWalr.lat,
      long: newWalr.long,
    };
    try {
      setLoading(true);
      const res = await axios.post("/walrs", postNewWalr);
      setWalrs([...walrs, res.data]);
      setLoading(false);
      setNewWalr(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem('user');
    setCurrentUser(null);
  };

  const handleOnSearch = async (string, results) => {
    const searchResults = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${process.env.REACT_APP_MAPBOX}`
    );
    const searchPlaces = searchResults.data.features;
    setSearchItems(searchPlaces)
  };

  const handleOnSelect = (item) => {
      const [long, lat] = item.geometry.coordinates;
      setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 15 })
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDblClick={handleNewWalr}
        transitionDuration="100"
      >
        <GeolocateControl
          style={{ left: 20, top: 20 }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {walrs.map((w) => (
          <>
            <Marker
              latitude={w.lat}
              longitude={w.long}
              offsetLeft={(-viewport.zoom * 5) / 2}
              offsetTop={-viewport.zoom * 5}
              key={w._id}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 5,
                  color: w.username === currentUser ? 'seagreen' : 'royalblue',
                  cursor: 'pointer',
                }}
                onClick={() => handleWalrClick(w._id, w.lat, w.long)}
              />
            </Marker>
            {w._id === currentWalrId && (
              <Popup
                latitude={w.lat}
                longitude={w.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentWalrId(null)}
              >
                <div className="card">
                  {w.username === currentUser && (
                  <Delete className="deleteIcon" onClick={handleDeleteWalr} />
                  )}
                  <div className="card_media">
                    <span className="reviewer">{w.username}</span>
                    <span className="timeAgo">{format(w.updatedAt)}</span>
                    <img
                      className="photo"
                      alt="Media in the card"
                      src={w.photo}
                      width={'200px'}
                      height={'150px'}
                    />
                    <h4 className="location">{w.title}</h4>
                    <p className="review">{w.desc}</p>
                  </div>
                  <div className="ratings">
                    {Array(w.rating).fill(
                      <Star style={{ fontSize: '15px' }} className="rating" />
                    )}
                    {Array(5 - w.rating).fill(
                      <StarBorder
                        style={{ fontSize: '15px' }}
                        className="rating"
                      />
                    )}
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newWalr && currentUser && (
          <Popup
            latitude={newWalr.lat}
            longitude={newWalr.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewWalr(null)}
          >
            <div className="newWalr">
              <form onSubmit={handleSubmit} className="newWalrForm">
                <label>Location</label>
                <input
                  maxLength={30}
                  placeholder="What is this place?"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label>Review</label>
                <textarea
                  maxLength={100}
                  placeholder="Review on the location."
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                <label>Rating</label>
                <Rating
                  className="ratingForm"
                  name="simple-controlled"
                  style={{ color: 'royalblue' }}
                  value={rating}
                  onChange={handleRating}
                />
                <label>Upload a photo</label>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setPhoto(base64);
                  }}
                />
                <button className="walrItButton" type="submit">
                  Walr it
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => {
                setShowRegister(false);
                setShowLogin(!showLogin);
              }}
            >
              Log In
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowLogin(false);
                setShowRegister(!showRegister);
              }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && (
          <Register
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
            setLoading={setLoading}
            />
            )}
        {showLogin && (
          <Login
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          myStorage={myStorage}
          setCurrentUser={setCurrentUser}
          setLoading={setLoading}
          />
        )}
        {loading && <CircularProgress className="loadingIcon" />}

      </ReactMapGL>
      <header className="searchBox">
        <div style={{ width: 300, cursor: 'default' }}>
          <ReactSearchAutocomplete
            items={searchItems}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            resultStringKeyName='place_name'
            fuseOptions={{keys:['place_name']}}
          />
        </div>
      </header>
      <div className="banner">
        <img src={walrusLogo} className="walrusBanner" alt="walrus logo" />
        <h3 className="trawalrsText">TRAWALRS</h3>
      </div>
      <footer>Made with &#10084; by Said Batuhan Bilmez in the scope of CS50x. 2021.</footer>
    </div>
  );
};

export default App;
