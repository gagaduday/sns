import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../actions";
import { Popup } from "semantic-ui-react";
import "./post.css";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderAdmin(post) {
    if (post.userId === this.props.currentUserId && post.userId !== null) {
      return (
        <Popup
          className="postlist-popup-item"
          on="click"
          pinned
          basic
          position="bottom right"
          trigger={
            <span className="postlist-popup-span">
              <i className="angle down icon" />
            </span>
          }
        >
          <Link className="postlist-action-link" to={`/posts/edit/${post.id}`}>
            Edit
          </Link>
          <Link
            className="postlist-action-link"
            to={`/posts/delete/${post.id}`}
          >
            Delete
          </Link>
        </Popup>
      );
    }
  }

  renderList() {
    return this.props.posts.map(post => {
      if (!post) return null;
      return (
        <div className="postlist-div">
          <Link className="postlist-content-link" to={`/posts/${post.id}`}>
            <div className="postlist-content-div" key={post.id}>
              {post.post}
            </div>
          </Link>
          <div>{this.renderAdmin(post)}</div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.posts) {
      return null;
    }
    return (
      <div className="ui container">
        <Link to="/posts/share">
          <form className="ui form">
            <input
              className="input-postlist"
              type="text"
              placeholder="What's happening?"
            />
          </form>
        </Link>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: Object.values(state.posts),
    currentUserId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
