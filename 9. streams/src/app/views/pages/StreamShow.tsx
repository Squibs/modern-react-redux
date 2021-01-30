import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { streamsOperations } from '../../state/ducks/streams';
import { AppState } from '../../state/store';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  stream: state.streams.streams[(ownProps.match.params.id as unknown) as number],
});

const mapDispatchToProps = {
  fetchStream: streamsOperations.fetchStream,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = RouteComponentProps<{ id: string }>; // react-router props... params can only be string, enforced with regex in routes though

type Props = PropsFromRedux & OwnProps;

/* -------------------------------- Component ------------------------------- */

const StreamShow: React.FC<Props> = ({ fetchStream, stream, match }: Props) => {
  // fetch the stream on component mount in case of refresh
  useEffect(() => {
    fetchStream((match.params.id as unknown) as number);
  }, [fetchStream, match.params.id]);

  return !stream ? (
    <>Loading...</>
  ) : (
    <>
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </>
  );
};

export default connector(StreamShow);
