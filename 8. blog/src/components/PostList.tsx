import React from 'react';
import { connect } from 'react-redux';
import {
  Posts,
  fetchPostsAndUsers as fetchPostsAndUsersAction,
} from '../actions';
import { AppState } from '../reducers';
import UserHeader from './UserHeader';

class PostList extends React.Component<LinkStateProps & LinkDispatchProps> {
  componentDidMount() {
    const { fetchPostsAndUsers } = this.props;

    fetchPostsAndUsers();
  }

  renderList() {
    const { posts } = this.props;
    return posts.map((post) => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}

interface LinkStateProps {
  posts: Posts[];
}

interface LinkDispatchProps {
  fetchPostsAndUsers: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, {
  fetchPostsAndUsers: fetchPostsAndUsersAction,
})(PostList);
