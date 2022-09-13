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
    <div className="sb_main_container">
      <h2 className="sb_title">{`${blog.title} ${blog.author}`}</h2>

      <div className="sb_likes_container">
        <p>{blog.likes} Likes</p>
        <button
          className="like_btn"
          onClick={(e) => handleLike(blog.id)}
        >
          Like
        </button>
      </div>

      <a
        className="sb_url"
        href={`https://${blog.url}`}
        target="blank"
      >{`https://${blog.url}`}</a>
      <p className="sb_single_blog_user">
        Added By: {blog.user.username}
      </p>

      {/* Conditionally render Remove Btn  */}
      {user.id === blog.user.id && (
        <button
          className="remove_btn"
          onClick={(e) => handleRemove(blog.id)}
        >
          Remove
        </button>
      )}

      <h4 style={{ margin: '.5rem 0' }}>Comments</h4>
      <CommentForm handleComment={handleComment} />
      <ul className="comments">{comments}</ul>
    </div>
  );
};

export default SingleBlog;
