import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isVisible: false,
  className: '',
};

const notificationSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    changeMessage(state, action) {
      return { ...state, message: action.payload };
    },
    messageVisibility(state, action) {
      return { ...state, isVisible: action.payload };
    },
    setClass(state, action) {
      return { ...state, className: action.payload };
    },
  },
});

let timeoutId;

export const setNotification = (message, className, displayTime) => {
  return async (dispatch) => {
    dispatch(changeMessage(message));
    dispatch(messageVisibility(true));
    dispatch(setClass(className));

    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(messageVisibility(false));
      }, displayTime);
    }

    timeoutId = setTimeout(() => {
      dispatch(messageVisibility(false));
    }, displayTime);
  };
};
export const { changeMessage, messageVisibility, setClass } = notificationSlice.actions;
export default notificationSlice.reducer;
