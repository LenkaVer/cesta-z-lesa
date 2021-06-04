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
      <div className="base_form_wrapper">
        <h2>Upravit profil</h2>
        {error && <div>{error}</div>}
        <form
          className="base_form base_form--update-profile"
          onSubmit={handleSubmit}
        >
          <div className="base_form__box">
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
            <label>Email</label>
          </div>
          <div className="base_form__box">
            <input
              type="password"
              ref={passwordRef}
              placeholder="Pro zachování hesla nechte prázdné"
            />
            <label>Heslo</label>
          </div>
          <div className="base_form__box">
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Pro zachování hesla nechte prázdné"
            />
            <label>Potvrzení hesla</label>
          </div>

          <button className="btn" disabled={loading} type="submit">
            Změnit
          </button>
        </form>

        <div>
          <Link className="btn" to="/">
            Zrušit
          </Link>
        </div>
      </div>
    </>
  );
};
