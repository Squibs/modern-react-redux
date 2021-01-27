import React, { Component } from 'react';

/* eslint-disable react/jsx-filename-extension */

// could use react-google-maps component example:
// import { GoogleMapLoader, GoogleMap } from 'react-google-maps';
// export default (props) => {
//   return (
//     <GoogleMapLoader
//       containerElement={ <div style={{height: '100%'}} /> }
//       googleMapElement={
//         <GoogleMap
//           defaultZoom={12}
//           defaultCenter={{lat: props.lat, lng: props.lon}}
//         />
//       }
//     />
//   );
// }
// this was not covered, but was in the project wrap-up for some reason.


class GoogleMap extends Component {
  componentDidMount() {
    // made into an anonymous function to suppress eslint no-new -> not sure if best way to handle;
    // the use of 'string refs' is deprecated/depreciated;
    // using 'this.refs.map' to reference '<div ref="map" />' is now deprecated
    // you now create the reference via '<div ref={(map) => { this.map = map; }} />'
    // and then refer to it with this.map;
    // the google class comes from the <script src="https://maps.googleapis.com/maps/api/js"></script>
    // in the head of the index.html
    (() => new google.maps.Map(this.map, {
      zoom: 11,
      center: {
        lat: this.props.lat,
        lng: this.props.lon,
      },
    }))();
  }

  render() {
    return (
      <div ref={(map) => { this.map = map; }} />
    );
  }
}

export default GoogleMap;
