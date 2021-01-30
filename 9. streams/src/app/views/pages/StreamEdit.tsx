import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { streamsOperations } from '../../state/ducks/streams';
import { StreamsState } from '../../state/ducks/streams/types';
import { AppState } from '../../state/store';
import { StreamForm } from '../components';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  stream: state.streams.streams[(ownProps.match.params.id as unknown) as number], // our id is a number, and I have regex on routes so this can only be digits, so I have to cast it as unknown and then to number
});

const mapDispatchToProps = {
  fetchStream: streamsOperations.fetchStream,
  editStream: streamsOperations.editStream,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = RouteComponentProps<{ id: string }>; // react-router props... params can only be string, enforced with regex in routes though

type Props = PropsFromRedux & OwnProps;

const StreamEdit: React.FC<Props> = ({ fetchStream, match, stream, editStream }: Props) => {
  useEffect(() => {
    fetchStream((match.params.id as unknown) as number);
  }, [fetchStream, match.params.id]);

  const onSubmit = (formValues: StreamsState) => {
    editStream((match.params.id as unknown) as number, formValues);
  };

  // need this, otherwise no initialValues will render on page refresh
  // if (!stream) {
  //   return <>Loading...</>;
  // }

  return (
    <>
      {!stream ? (
        <>Loading...</>
      ) : (
        <>
          <h3>Edit a Stream</h3>
          <StreamForm onFormSubmit={onSubmit} formInitialValues={stream} />
        </>
      )}
    </>
  );
};

export default connector(StreamEdit);

// each component needs to be designed to work in isolation (fetch its own data) with react-router
