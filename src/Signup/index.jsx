import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db } from './../firebase';

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup, createUserData } = useAuth();
  const [error, setError] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [cannotContinue, setCannotContinue] = useState(true);
  const [username, setUsername] = useState('');
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
  useEffect(() => {
    if (username !== '') {
      db.collection('users')
        .where('username', '==', username)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            setErrorUsername('Uživatel s danou přezdívkou již existuje');
            setCannotContinue(true);
          } else {
            setCannotContinue(false);
            setErrorUsername('');
          }
        });
    } else {
      setCannotContinue(true);
      setErrorUsername('Zadejte přezdívku');
    }
    usernameRef.current.setCustomValidity(errorUsername);
  }, [username, errorUsername]);

  return (
    <>
      <div className="base_form_wrapper">
        <h2>Registrace</h2>
        {error && <div>{error}</div>}
        <form className="base_form" onSubmit={handleSubmit}>
          <div className="base_form__box">
            <input
              id="email-signup"
              type="email"
              placeholder=" "
              ref={emailRef}
              required
            />
            <label htmlFor="email-signup" email-signup>
              Email:
            </label>
            <div className="error">Zadejte validní email</div>
          </div>
          <div className="base_form__box">
            <input
              id="nickname-signup"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              ref={usernameRef}
              placeholder=" "
              required
            />
            <label htmlFor="nickname-signup">Přezdívka:</label>
            {errorUsername && <div className="error">{errorUsername}</div>}
          </div>
          <div className="base_form__box">
            <input
              id="password-signup"
              type="password"
              ref={passwordRef}
              placeholder=" "
              required
              minLength="6"
            />
            <label htmlFor='"password-signup"'>Heslo:</label>
            <div className="error">Heslo musí mít nejméně 6 znaků</div>
          </div>
          <div className="base_form__box">
            <input
              id="password-confirm"
              type="password"
              ref={passwordConfirmRef}
              placeholder=" "
              required
              minLength="6"
            />
            <label htmlFor="password-confirm">Potvrzení hesla:</label>
            <div className="error">Heslo musí mít nejméně 6 znaků</div>
          </div>
          <button disabled={loading || cannotContinue} type="submit">
            Registrovat se
          </button>
        </form>

        <div>
          Již máte účet?{' '}
          <Link className="link" to="/login">
            Přihlásit se
          </Link>
        </div>
      </div>
    </>
  );
};
