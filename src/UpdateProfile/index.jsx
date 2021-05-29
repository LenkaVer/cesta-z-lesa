import React, { useRef, useState } from 'react';
import { useAuth } from './../Auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div>
        <h2 className="text-center mb-4">Upravit profil</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </label>

          <label>
            Heslo
            <input
              type="password"
              ref={passwordRef}
              placeholder="Pro zachování hesla nechte prázdné"
            />
          </label>

          <label>
            Potvrzení hesla
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Pro zachování hesla nechte prázdné"
            />
          </label>

          <button disabled={loading} type="submit">
            Update
          </button>
        </form>
      </div>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};
