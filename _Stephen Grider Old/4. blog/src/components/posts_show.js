import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

/* eslint-disable react/jsx-filename-extension */

class PostsShow extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    // you can wrap these two lines in an `if (!this.props.post) {}`
    // this means that if you already have a post, do not attempt to re-fetch it
    // this would be useful if you would like to limit network requests... but
    // that would also mean that the data could potentially be out of date unless
    // your system is setup to handle things like that, such as attaching a key or something
    // that you could check to see if content needs to be updated
    const { id } = this.props.match.params; // from react-router src/index.js (:id wildcard)
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    // there is access to this.props.post.id; but this assumes that the post is
    // in existence in this component it assumes we have fetched the post already.
    // The ...params.id will always have the id available
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
    // adding on a callback for what happens after the post is deleted, we need to be navigated
    // back to the index
  }

  render() {
    const { post } = this.props;

    // for initial render of this component; posts will not have yet been retrieved
    // return nothing/loading
    if (!post) {
      return <div>Loading...</div>;
    }
    // this will also be shown on post ids that just don't exist; that will have to
    // be fixed on a real app (probably?); so do something such as: on 404, redirect to
    // a 404 page: post not found (this is me assuming what would be a good thing to do)
    // rather than display 'Loading...' forever, as no post is going to show up

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// the component only cares about a single individual post, NOT the entire list of posts
// second argument to mapStateToProps, by convention ownProps, ownProps is the props
// object headed/going to the PostsShow component.
// this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
  // creating this.props.post
  // post: state.posts[this.props.match.params.id]
  // the component already has access to this.props.match.params.id from react-router
  // from src/index.js (id being the :id wildcard)... ownProps is accessing the
  // props the component already has, so we are giving this component (PostsShow) the
  // property of post (this.props.post), which is set by accessing the posts list from
  // the state (this.state.posts) and then looking for a particular id in which a post has
  // from ownProps.match.params.id (this.props.match.params.id).
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
