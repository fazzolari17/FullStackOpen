// import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector((state) => state.allUsers);

  const mapped = users.map((item) => (
    <div key={item.id} className="userBlogs">
      <Link to={`/users/${item.id}`}>{item.username}</Link>
      <div className="blogCount">{item.blog.length}</div>
    </div>
  ));

  return (
    <div className="Users_Page_Wrapper">
      <h2>Users</h2>
      <div className="userTitle">
        <h5>username</h5>
        <h5>Blogs Created</h5>
      </div>
      {mapped}
    </div>
  );
};

export default Users;
