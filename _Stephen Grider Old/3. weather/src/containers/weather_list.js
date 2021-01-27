import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

/* eslint-disable react/jsx-filename-extension */

class WeatherList extends Component {
  static renderWeather(cityData) {
    const name = cityData.city.name;
    const temperature = cityData.list.map(weather => weather.main.temp);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} />{name}</td>
        <td><Chart data={pressure} color="orange" units="K" /></td>
        <td><Chart data={pressure} color="green" units="hPa" /></td>
        <td><Chart data={humidity} color="black" units="%" /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(WeatherList.renderWeather)}
        </tbody>
      </table>
    );
  }
}

// access to this.props.weather
// const weather = state.weather => ({ weather })
function mapStateToProps({ weather }) {
  return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);
