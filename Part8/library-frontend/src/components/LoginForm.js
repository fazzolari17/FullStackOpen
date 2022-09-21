import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { LOGIN, CURRENT_USER } from '../queries';
import { useField } from '../hooks/useField';

const LoginForm = ({
  setPage,
  setError,
  setToken,
  show,
}) => {
  const username = useField('text');
  const password = useField('password');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const currentUser = useQuery(CURRENT_USER);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
      localStorage.setItem(
        'user',
        JSON.stringify(currentUser.data.me)
      );
    }
  }, [result.data]); // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault();

    login({
      variables: {
        username: username.value,
        password: password.value,
      },
    });
    password.onReset('');
    username.onReset('');
    setPage('books');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username <input {...username} />
        </div>
        <div>
          password <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
