import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// reduxForm is treated very much like the connect helper from the react-redux library
// each form element needs to be in its own <Field />
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable class-methods-use-this */

class PostsNew extends Component {
  // including constructor to bind 'this' to the onSubmit function:
  // before we were doing <form onSubmit={handleSubmit(this.onSubmit).bind(this)}>
  // which by eslint rules | jsx props should not use .bind() (react/jsx-no-bind)
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    // react-router-dom gives properties to this component (PostsNew) when we
    // passed it through the <Route /> in the src/index.js (eg. this.props.history.push)
    this.props.createPost(values, () => {
      this.props.history.push('/'); // callback gets called after axios request in createPost() action
    });
  }
  // could change the dom to show posting... or something to let user know post is being submitted
  // rather than sitting on the form screen

  renderField(field) {
    // some advanced destructuring. pulling meta off from field (field.meta) and pulling
    // touched & error off of meta so (field.meta.touched & field.meta.error)
    const { meta: { touched, error } } = field;
    // only want to show the 'has-danger' css class when the element
    // has been touched and has an error
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  // field.input an object that contains event handlers & props (onChange, onBlur, onFocus) and has
  // the value of the input. So '...field.input' means that we want all of the different properties
  // and this object to be communicated as props to the input tag. This saves us from having to do:
  // onChange={field.input.onChange} onFocus={field.input.onFocus} onBlur={field.input.onBlur}...;
  // the meta.error property is automatically added to the Field object from the validate function;
  // there are three states to a form element: pristine, touched, and invalid -> you can use
  // field.meta.touched to only display the error when the field has been touched so that
  // error messages do not appear when the form is first loaded

  render() {
    // handleSubmit comes from reduxFrom helper (bottom of file)
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}
// name is what piece of state are we trying to describe / what user is editing;
// Not putting any parentheses on this.renderTitleField because we are not
// calling the renderTitleField our-selves, we are just putting in a reference to a function
// the Field will call the function at some point in the future
// renderTitleField (now converted to renderField to reduce duplicate logic)

// validate will be called automatically for us at certain points during the forms life-cycle
// for example when the user tries to submit the form. We link up this validate function
// inside of the reduxFrom helper function as another property
function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {}; // always initialized as an empty object

  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}
// values is an object that contains all the different values that a user has entered into the form

// form property: is the name of the form (UNIQUE string); allows for multiple forms on one page
// (e.g. login or sign-up form both on one page)
export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(connect(null, { createPost })(PostsNew));
// null because we are not using mapStateToProps
// { createPost } as mapDispatchToProps
