import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
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

export const resetLoginForm = () => {
  return async (dispatch) => {
    dispatch(resetForm(initialState));
  };
};

export const { setUsername, setPassword, resetForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
