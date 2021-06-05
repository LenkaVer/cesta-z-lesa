import React, { useRef, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push('/game');
    } catch {
      setError('Přihlášení se nezdařilo');
      setLoading(false);
    }
  }

  return (
    <>
      <div className="base_form_wrapper">
        <h2>Přihlášení</h2>
        {error && <div>{error}</div>}
        <form className="base_form" onSubmit={handleSubmit}>
          <div className="base_form__box">
            <input
              id="email"
              type="email"
              placeholder=" "
              ref={emailRef}
              required
            />
            <label htmlFor="email">Email:</label>
            <div className="error">Zadejte validní email</div>
          </div>
          <div className="base_form__box">
            <input
              id="password"
              type="password"
              placeholder=" "
              ref={passwordRef}
              required
            />
            <label htmlFor="password">Heslo:</label>
          </div>
          <button disabled={loading} type="submit">
            Přihlásit se
          </button>
        </form>
        <div className="user-signup-navigation">
          <div>
            <Link className="link" to="/forgot-password">
              Zapomněli jste heslo?
            </Link>
          </div>

          <div>
            Nemáte ještě účet?
            <Link className="link link-left-space" to="/signup">
              Zaregistrujte se
            </Link>
          </div>

          <div>
            Chcete pokračovat bez registrace?
            <Link className="link link-left-space" to="/signup-anonymous">
              Pokračovat bez registrace
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
