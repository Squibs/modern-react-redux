import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Link is nearly identical to an anchor tag for navigation
// Link prevents default events an anchor tag has such as going to the server
// and retrieving a new html document

import { fetchPosts } from '../actions';

/* eslint-disable react/jsx-filename-extension */

class PostsIndex extends Component {
  // called when this component has shown up in the DOM
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // lodash map function works on objects (JS array.map does not)
    return _.map(this.props.posts, post => (
      <li className="list-group-item" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// gives access to this.props.posts
function mapStateToProps(state) {
  return { posts: state.posts };
}

// connect(mapStateToProps, mapDispatchToProps)(component);
// null: not passing mapStateToProps; shortcut to bypass doing mapDispatchToProps function
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
