import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';

const SingleBlog = ({
  handleLike,
  handleRemove,
  handleComment,
}) => {
  const blogs = useSelector((state) => state.blogs);
  const blogId = useParams();
  const user = useSelector((state) => state.user);
  // Fixes crash when refreshing page that is on a single blog
  if (blogs.length < 1) {
    return null;
  }

  const blog = blogs.find((blog) => blog.id === blogId.id);
  const comments = blog.comments.map((comment) => (
    <li key={comment.id}>{comment.comment}</li>
  ));

  return (
    <div className="SingleBlog__mainContainer">
      <h2 className="SingleBlog__mainContainer__title">{`${blog.title} ${blog.author}`}</h2>

      <div className="SingleBlog__mainContainer__likesContainer">
        <p>{blog.likes} Likes</p>
        <button
          className="SingleBlog__mainContainer__like_btn"
          onClick={(e) => handleLike(blog.id)}
        >
          Like
        </button>
      </div>

      <a
        className="SingleBlog__mainContainer__url"
        href={`https://${blog.url}`}
        target="blank"
      >{`https://${blog.url}`}</a>
      <p className="SingleBlog__mainContainer__user">
        Added By: {blog.user.username}
      </p>

      {/* Conditionally render Remove Btn  */}
      {user.id === blog.user.id && (
        <button
          className="SingleBlog__mainContainer__remove_btn"
          onClick={(e) => handleRemove(blog.id)}
        >
          Remove
        </button>
      )}

      <h4 style={{ margin: '.5rem 0' }}>Comments</h4>
      <CommentForm handleComment={handleComment} />
      <ul className="SingleBlog__mainContainer__comments">
        {comments}
      </ul>
    </div>
  );
};

export default SingleBlog;
