import { useState, useRef } from 'react';
import { Close } from '@material-ui/icons';
import axios from 'axios';

import './Login.css';
import walrusLogo from '../../images/walrus.png';

export default function Login({
  setShowRegister,
  setShowLogin,
  myStorage,
  setCurrentUser,
  setLoading,
}) {
  const [danger, setDanger] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      setLoading(true);
      const res = await axios.post('/users/login', user);
      myStorage.setItem('user', res.data.username);
      setCurrentUser(res.data.username);
      setLoading(false);
      setShowLogin(false);
      setDanger(false);
    } catch (error) {
      setDanger(true);
    }
  };
  return (
    <div className="loginContainer">
      <img src={walrusLogo} className="walrusLogo" alt="walrus logo" />
      <form onSubmit={handleSubmit} className="loginForm">
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {danger && (
          <span className="danger">Incorrect username or password!</span>
        )}
      </form>
      <span className="notRegisteredYet">
        Not registered yet? Go to {''}
        {/* eslint-disable */}
        <a
          onClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          className="registerBtn"
        >
          Register
        </a>
        {/* eslint-enable */}
      </span>
      <Close className="loginClose" onClick={() => setShowLogin(false)} />
    </div>
  );
}
