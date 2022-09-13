import { useField } from '../hooks/useField';
import { useParams } from 'react-router-dom';

const CommentForm = ({ handleComment }) => {
  const comment = useField('text');
  const blogId = useParams().id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { comment: comment.value, blogId };
    handleComment(newComment);
    comment.onReset();
  };
  const style = {
    1: {
      padding: '.25rem',
    },
    2: {
      margin: '.5rem 1rem',
      padding: '.25rem .5rem',
    },
  };

  return (
    <>
      <form
        className="comment_form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input style={style[1]} {...comment}></input>
        <button style={style[2]} type="submit">
          Add Comment
        </button>
      </form>
    </>
  );
};

export default CommentForm;
