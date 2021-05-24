import React, { useRef, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  }

  return (
    <>
      <div>
        <h2>Zapomenuté heslo</h2>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" ref={emailRef} required />
          </label>
          <button disabled={loading}>Obnovit heslo</button>
        </form>
        <div>
          <Link to="/login">Přihlásit se</Link>
        </div>
      </div>
      <div>
        Nemáte ještě účet? <Link to="/signup">Zaregistrujte se</Link>
      </div>
    </>
  );
};
