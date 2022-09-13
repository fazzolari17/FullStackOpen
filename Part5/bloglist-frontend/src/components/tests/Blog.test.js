import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Blog from '../Blog';

let title;
let author;
let url;
let likes;
let username;
let mockHandler;
let user;

beforeEach(async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'www.testing-library.com',
    likes: 0,
    user: {
      name: 'root',
    },
  };
  user = userEvent.setup();
  mockHandler = jest.fn();
  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleRemove={mockHandler}
    />
  );

  title = screen.getByText('title');
  author = screen.getByText('author');
  url = screen.getByLabelText('url');
  likes = screen.getByText('Like');
  username = screen.getByLabelText('username');
});
test('renders content', () => {
  const element = screen.getByTestId('blog');
  expect(element).toBeDefined();
});

test('clicking the show button shows expanded view', async () => {
  const button = screen.getByText('Show');
  const hidden = screen.getByTestId('hidden');
  expect(hidden).not.toBeVisible();

  await user.click(button);
  expect(hidden).toBeVisible();
});

test('title and author shown by default, url and likes does not', async () => {
  expect(title).toBeVisible();
  expect(author).toBeVisible();
  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
  expect(username).not.toBeVisible();
});

test('when show button clicked url, likes, and username are shown', async () => {
  const button = screen.getByText('Show');
  await user.click(button);

  expect(title).toBeVisible();
  expect(author).toBeVisible();
  expect(url).toBeVisible();
  expect(likes).toBeVisible();
  expect(username).toBeVisible();
});

test('when hide button clicked url, likes, and username are NOT shown', async () => {
  const showBtn = screen.getByText('Show');
  await user.click(showBtn);

  const hideBtn = screen.getByText('Hide');
  await user.click(hideBtn);

  expect(title).toBeVisible();
  expect(author).toBeVisible();
  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
  expect(username).not.toBeVisible();
});

test('like button is called twice when clicked twice', async () => {
  const showBtn = screen.getByText('Show');
  await user.click(showBtn);

  const likeBtn = screen.getByText('Like');
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('remove is called twice when clicked twice', async () => {
  const user = userEvent.setup();

  const showBtn = screen.getByText('Show');
  await user.click(showBtn);

  const likeBtn = screen.getByText('Remove');
  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
