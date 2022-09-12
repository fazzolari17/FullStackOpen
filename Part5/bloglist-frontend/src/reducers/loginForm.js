import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'Giuseppe',
  password: '',
};

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload };
    },
    setPassword(state, action) {
      return { ...state, password: action.payload };
    },
    resetForm(state, action) {
      return (state = action.payload);
    },
  },
});
export const addUsername = (username) => {
  return (dispatch) => {
    dispatch(setUsername(username));
  };
};
export const addPassword = (password) => {
  return (dispatch) => {
    dispatch(setPassword(password));
  };
};
export const resetLoginForm = () => {
  return (dispatch) => {
    dispatch(resetForm());
  };
};

export const { setUsername, setPassword, resetForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
