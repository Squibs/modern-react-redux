import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { Modal } from '../components';
import { history } from '../../routes';
import { AppState } from '../../state/store';
import { streamsOperations } from '../../state/ducks/streams';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  stream: state.streams.streams[(ownProps.match.params.id as unknown) as number],
});

const mapDispatchToProps = {
  fetchStream: streamsOperations.fetchStream,
  deleteStream: streamsOperations.deleteStream,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = RouteComponentProps<{ id: string }>; // react-router props... params can only be string, enforced with regex in routes though

type Props = PropsFromRedux & OwnProps;

/* -------------------------------- Component ------------------------------- */

const StreamDelete: React.FC<Props> = ({ fetchStream, deleteStream, stream, match }: Props) => {
  useEffect(() => {
    fetchStream((match.params.id as unknown) as number);
  }, [fetchStream, match.params.id]);

  const renderModalActions = () => {
    const id = (match.params.id as unknown) as number;
    return (
      <>
        <button onClick={() => deleteStream(id)} type="button" className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };

  const renderModalContent = () =>
    `Are you sure you want to delete the stream ${!stream ? '?' : `with title: ${stream.title}?`}`;

  return (
    <>
      <Modal
        modalTitle="Delete Stream"
        modalContent={renderModalContent()}
        modalActions={renderModalActions()}
        modalOnDismiss={() => history.push('/')}
      />
    </>
  );
};

export default connector(StreamDelete);

// create portal to display modal over other rendered content
