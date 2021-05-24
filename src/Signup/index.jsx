import React, { useRef, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup, createUserData } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(
        emailRef.current.value,
        passwordRef.current.value,
      );
      if (userCredential) {
        createUserData(userCredential.user.uid, usernameRef.current.value);
        setLoading(false);
        history.push('/game');
      } else {
        setError('Failed to create an account');
        setLoading(false);
      }
    } catch {
      setError('Failed to create an account');
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <h2 className="text-center mb-4">Registrace</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Přezdívka
            <input type="text" ref={usernameRef} required />
          </label>
          <label>
            Heslo
            <input type="password" ref={passwordRef} required />
          </label>
          <label>
            Potvrzení hesla
            <input type="password" ref={passwordConfirmRef} required />
          </label>
          <button disabled={loading} type="submit">
            Registrovat se
          </button>
        </form>
      </div>
      <div>
        Již máte účet? <Link to="/login">Přihlásit se</Link>
      </div>
    </>
  );
};
