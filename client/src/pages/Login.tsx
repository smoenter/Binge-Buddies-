import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { QUERY_FRIENDS } from '../utils/queries';
import Auth from '../utils/auth';

import "./css/Login.css"

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const client = useApolloClient();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      if (data?.login?.token) {
        Auth.login(data.login.token);

        // Optional: Query friends after login
        const { data: friendsData } = await client.query({
          query: QUERY_FRIENDS,
          fetchPolicy: "network-only",
        });

        const friendIds = new Set(
          friendsData?.user?.friends?.map((friend: any) => friend._id)
        );

        localStorage.setItem('friendIds', JSON.stringify(Array.from(friendIds)));

        // ✅ Navigate to transition page
        console.log("Navigating to transition page...");
        navigate('/transition', { state: { fromSignup: false } });
      }

    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main 
    className="custom-bg-container"
    >
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;