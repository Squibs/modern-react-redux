/* eslint-disable react/prop-types */

import React from 'react';
import './SeasonDisplay.css';

const seasonConfig = {
  summer: {
    text: "Let's hit the beach!",
    iconName: 'sun',
  },
  winter: {
    text: 'Burr it is cold!',
    iconName: 'snowflake',
  },
};

const getSeason = (lat:number, month:number) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter';
  }

  return lat > 0 ? 'winter' : 'summer';
};

interface ISeasonDisplayProps {
  lat: number,
}

const SeasonDisplay:React.FC<ISeasonDisplayProps> = ({ lat }) => {
  const season = getSeason(lat, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];

  return (
    <div className={`season-display ${season}`}>
      <i className={`icon-left massive ${iconName} icon`} />
      <h1>{text}</h1>
      <i className={`icon-right massive ${iconName} icon`} />
    </div>
  );
};

export default SeasonDisplay;
