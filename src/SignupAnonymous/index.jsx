import React, { useRef, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export const SignupAnonymous = () => {
  const usernameRef = useRef();
  const { signupAnonymous, createUserData } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
        <h2 className="text-center mb-4">Bez registrace</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Přezdívka
            <input type="text" ref={usernameRef} required />
          </label>
          <button disabled={loading} type="submit">
            Pokračovat
          </button>
        </form>
      </div>
      <div>
        Již máte účet? <Link to="/login">Přihlásit se</Link>
      </div>
      <div>
        <Link to="/signup">Registrovat se</Link>
      </div>
    </>
  );
};
