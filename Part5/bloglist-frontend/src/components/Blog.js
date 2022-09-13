import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({
  blog,
  handleLike,
  handleRemove,
  onUserPage,
}) => {
  // updates style based on page
  let blogStyle;
  onUserPage
    ? (blogStyle = {
        paddingTop: '10rem',
        paddingLeft: '2rem',
        marginBottom: '5rem',
        marginTop: '1rem',
      })
    : (blogStyle = {
        padding: '.25rem 1rem',
        border: '1px solid black',
        borderRadius: '5px',
        margin: '1rem',
        backgroundColor: '#F7F0F0',
        color: '#FFF07C',
      });

  const style = {
    style: {
      margin: '1rem',
      color: '#484349',
    },
  };

  if (onUserPage) {
    return (
      <section
        data-testid={'blog'}
        className="blog"
        style={style.style}
      >
        <li>{blog.title}</li>
      </section>
    );
  } else {
    return (
      <div style={blogStyle}>
        <Link
          to={`/blogs/${blog.id}`}
          style={{
            color: '#484349',
            textDecoration: 'none',
          }}
        >
          {`${blog.title} ${blog.author}`}{' '}
        </Link>
      </div>
    );
  }
};

export default Blog;
