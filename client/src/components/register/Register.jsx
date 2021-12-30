import { useState, useRef } from 'react';
import { Close } from '@material-ui/icons';
import axios from 'axios';

import './Register.css';
import walrusLogo from '../../images/walrus.png';

export default function Register({
  setShowRegister,
  setShowLogin,
  setLoading,
}) {
  const [success, setSuccess] = useState(false);
  const [danger, setDanger] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      setLoading(true);
      await axios.post('/users/register', newUser);
      setLoading(false);
      setDanger(false);
      setSuccess(true);
    } catch (error) {
      setDanger(true);
    }
  };
  return (
    <div className="registerContainer">
      <img src={walrusLogo} className="walrusLogo" alt="walrus logo" />
      <form onSubmit={handleSubmit} className="registerForm">
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {danger && (
          <span className="danger">
            This username or email is already in use.
          </span>
        )}
      </form>
      {success && (
        <span className="success">
          Success! Go to {''}
          {/* eslint-disable */}
          <a
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
            className="loginBtn"
          >
            Log In
          </a>
          {/* eslint-enable */}
        </span>
      )}
      <Close className="registerClose" onClick={() => setShowRegister(false)} />
    </div>
  );
}
