import React, { useRef, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';

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
      setError('Failed to log in');
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <h2>Přihlášení</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" ref={emailRef} required />
          </label>
          <label>
            Heslo
            <input type="password" ref={passwordRef} required />
          </label>
          <button disabled={loading} type="submit">
            Přihlásit se
          </button>
        </form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Zapomněli jste heslo?</Link>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Nemáte ještě účet? <Link to="/signup">Zaregistrujte se</Link>
      </div>
    </>
  );
};
