import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/configureStore';
import { Song } from '../types/Song';

type Props = LinkStateProps;

const SongDetail = ({ song }: Props): JSX.Element => {
  if (!song) {
    return <div>Select a song</div>;
  }

  return (
    <div>
      <h3>Details for:</h3>
      <p>
        {`Title: ${song.title}`}
        <br />
        {`Duration: ${song.duration}`}
      </p>
    </div>
  );
};

interface LinkStateProps {
  song: Song | null;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
