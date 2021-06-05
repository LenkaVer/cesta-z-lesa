import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db } from './../firebase';

export const SignupAnonymous = () => {
  const { signupAnonymous, createUserData } = useAuth();
  const [error, setError] = useState('');
  const [cannotContinue, setCannotContinue] = useState(true);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const usernameRef = useRef();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const userCredential = await signupAnonymous();
      if (userCredential) {
        createUserData(userCredential.user.uid, usernameRef.current.value);
        setLoading(false);
        history.push('/hra');
      } else {
        setError('Failed to create an account');
        setLoading(false);
      }
    } catch {
      setError('Failed to create an account');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (username !== '') {
      db.collection('users')
        .where('username', '==', username)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            setError('Uživatel s danou přezdívkou již exituje');
            setCannotContinue(true);
          } else {
            setCannotContinue(false);
            setError('');
          }
        });
    } else {
      setCannotContinue(true);
      setError('Zadejte přezdívku');
    }

    usernameRef.current.setCustomValidity(error);
  }, [username, error]);

  return (
    <>
      <div className="base_form_wrapper">
        <h2>Bez registrace</h2>

        <form className="base_form" onSubmit={handleSubmit}>
          <div className="base_form__box">
            <input
              id="nickname-anonymously"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
              placeholder=" "
              ref={usernameRef}
              required
            />
            <label htmlFor="nickname-anonymously">Přezdívka:</label>
            {error && <div className="error">{error}</div>}
          </div>
          <button disabled={loading || cannotContinue} type="submit">
            Pokračovat
          </button>
        </form>

        <div>
          Již máte účet?
          <Link className="link link-left-space" to="/prihlaseni">
            Přihlásit se
          </Link>
        </div>
        <div>
          <Link className="link" to="/registrace">
            Registrovat se
          </Link>
        </div>
      </div>
    </>
  );
};
