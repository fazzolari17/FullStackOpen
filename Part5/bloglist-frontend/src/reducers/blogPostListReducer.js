import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';
import { setNotification } from './notificationReducer';

const blogPostSlice = createSlice({
  name: 'blogPost',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return (state = action.payload);
    },
    clearBlogs(state, action) {
      return (state = action.payload);
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    removeABlog(state, action) {
      const updatedState = state.filter(
        (item) => item.id !== action.payload
      );
      return (state = updatedState);
    },
    updateLikes(state, action) {
      const updatedState = state.map((item) =>
        item.id !== action.payload
          ? item
          : { ...item, likes: parseInt(item.likes) + 1 }
      );
      return (state = updatedState);
    },
    addComment(state, action) {
      console.log(action);
      const updatedState = state.map((item) =>
        item.id !== action.payload.blogId
          ? item
          : { ...item, comments: action.payload.comment }
      );
      return (state = updatedState);
    },
  },
});

export const initializeState = () => {
  return async (dispatch) => {
    try {
      const response = await blogService.getAll();
      dispatch(setBlogs(response));
    } catch (error) {
      if (error.response.data.error === 'token expired') {
        dispatch(
          setNotification(
            error.response.data.error,
            'errorMsg',
            '2000'
          )
        );
      }
    }
  };
};

export const removeAllBlogs = () => {
  return async (dispatch) => {
    dispatch(clearBlogs([]));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const response = await blogService.create(content);
    dispatch(appendBlogs(response));
  };
};

export const removeBlogFromState = (id, token) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeABlog(id));
    dispatch(initializeState(token));
  };
};

export const addLikes = (id, updatedObject) => {
  return async (dispatch) => {
    await blogService.update(id, updatedObject);
    dispatch(updateLikes(id));
  };
};

export const addComments = (token, comment) => {
  return async (dispatch) => {
    const response = await blogService.createComment(
      comment
    );
    dispatch(initializeState(token));
    return response;
  };
};

export const {
  setBlogs,
  clearBlogs,
  appendBlogs,
  removeABlog,
  updateLikes,
  addComment,
} = blogPostSlice.actions;
export default blogPostSlice.reducer;
