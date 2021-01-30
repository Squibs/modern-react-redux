import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { streamsOperations } from '../../state/ducks/streams';
import { StreamsState } from '../../state/ducks/streams/types';
import { AppState } from '../../state/store';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState) => ({
  streams: Object.values(state.streams.streams),
  currentUserId: state.session.auth.userId,
  isSignedIn: state.session.auth.isSignedIn,
});

const mapDispatchToProps = { fetchStreams: streamsOperations.fetchStreams };

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

/* -------------------------------- Component ------------------------------- */

// home/index
const StreamList: React.FC<Props> = ({
  fetchStreams,
  streams,
  currentUserId,
  isSignedIn,
}: Props) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  // delete and edit buttons; user has admin privileges over this stream
  const renderAdmin = (stream: StreamsState) => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }

    return null;
  };

  const renderList = () => {
    return [...streams].map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  // show create stream button if user is logged in
  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <Link to="/streams/new" className="ui button primary right floated">
          Create Stream
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </>
  );
};

export default connector(StreamList);
