import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  // shorthand for constructor below
  state = { lat: null, errorMessage: '' };
  // constructor(props) {
  //   super(props);
  //   this.state = { lat: null, errorMessage: '' };
  // }

  // constructor(props) {
  //   super(props);

  //   // THIS IS THE ONLY TIME we do direct assignment to this.state
  //   this.state = { lat: null, errorMessage: '' };
  // }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message }),
    );
  }

  // not a react method, our own custom method
  renderContent() {
    const { lat, errorMessage } = this.state;

    if (errorMessage && !lat) {
      return <div>Error: {errorMessage}</div>;
    }

    if (!errorMessage && lat) {
      return <SeasonDisplay lat={lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
