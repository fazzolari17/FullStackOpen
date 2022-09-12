import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import BlogForm from '../BlogForm';

let user;
let addBlog;

let mockHandler;

let submitBtn;
let titleInput;
let authorInput;
let urlInput;

beforeEach(() => {
  user = userEvent.setup();
  addBlog = jest.fn();
  mockHandler = jest.fn();

  render(<BlogForm setNewBlog={mockHandler} handleSubmit={(e) => addBlog(e.preventDefault())} />);
  submitBtn = screen.getByRole('submit');
  titleInput = screen.getByLabelText('blog title');
  authorInput = screen.getByLabelText('blog author');
  urlInput = screen.getByLabelText('blog url');
});

test('addBlog is called twice when submit is clicked twice', async () => {
  await user.click(submitBtn);
  await user.click(submitBtn);

  expect(addBlog.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parentState and calls onSubmit', async () => {
  await user.type(titleInput, 'title');
  expect(mockHandler.mock.calls).toHaveLength(5);

  await user.type(authorInput, 'author');
  expect(mockHandler.mock.calls).toHaveLength(11);

  await user.type(urlInput, 'www.testing-library.com');
  expect(mockHandler.mock.calls).toHaveLength(34);

  await user.click(submitBtn);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(titleInput).toBeInTheDocument('title');
  expect(authorInput).toBeInTheDocument('author');
  expect(urlInput).toBeInTheDocument('www.testing-library.com');
});
