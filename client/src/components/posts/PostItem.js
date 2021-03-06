import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux'; // like, unlike, remove post gibi işlemler için
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  showActions,
}) => {
  return (
    <div class='post bg-white p-1 my-1' style={{ borderRadius: '25px' }}>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>{' '}
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addLike(_id)}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-up' />
              {likes.length > 0 && <span> {likes.length} </span>}
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type='button'
              class='btn btn-light'
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} class='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span class='comment-count'> {comments.length} </span>
              )}
            </Link>
            {!auth.loading && auth.user._id === user && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                class='btn btn-danger'
                title='Remove'
              >
                <i class='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true, // addLike, removeLike, deleteComment actions
  // single post sayfasında gözükmesin, burada gözüksün.
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired, // Ana comp olan Post comp dan geldi, state(store) dan değil. o yüzden mapStateToProps da yok
  auth: PropTypes.object.isRequired, // store dan geldi
};

const mapStateToProps = (state) => ({
  auth: state.auth, // for authenticated user info..
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
