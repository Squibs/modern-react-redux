import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../store/configureStore';
import { Song } from '../types/Song';
import { selectSong as actionSelectSong } from '../actions'; // to avoid no shadow error
import { SelectSongAction } from '../types/actions';

// these aren't it's own props so I don't need this
// interface ISongListProps {
//   songs?: Song[];
// }

type Props = LinkStateProps & LinkDispatchProps; // & ISongListProps if i wanted to add it's own props

class SongList extends React.Component<Props> {
  renderList() {
    const { songs, selectSong } = this.props;

    return songs.map((song) => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button
              onClick={() => selectSong(song)}
              type="button"
              className="ui button primary"
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

interface LinkStateProps {
  songs: Song[];
}

interface LinkDispatchProps {
  selectSong: (song: Song) => SelectSongAction;
}

// ownProps is the props of your normal component regardless of what you are sending in through redux
const mapStateToProps = (state: AppState): LinkStateProps => {
  return { songs: state.songs };
};

// prettier-ignore
// const mapDispatchToProps = (dispatch: Dispatch<AppActions>): LinkDispatchProps => ({
//   selectSong: (song: Song) => dispatch(selectSong(song)),
// });

// to avoid no shadow error selectSong was imported as actionSelectSong then remapped back to selectSong in props
export default connect(mapStateToProps, { selectSong: actionSelectSong })(SongList);
