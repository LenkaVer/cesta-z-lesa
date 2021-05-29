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
      <div className="base_form_wrapper">
        <h2>Zapomenuté heslo</h2>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form className="base_form" onSubmit={handleSubmit}>
          <div className="base_form__box">
            <input
              id="email-newpassword"
              type="email"
              placeholder=" "
              ref={emailRef}
              required
            />
            <label htmlFor="email-newpassword">Email:</label>
          </div>
          <button disabled={loading}>Obnovit heslo</button>
        </form>

        <div>
          <Link className="link" to="/login">
            Přihlásit se
          </Link>
        </div>

        <div>
          Nemáte ještě účet?
          <Link className="link link-left-space" to="/signup">
            Zaregistrujte se
          </Link>
        </div>
      </div>
    </>
  );
};
