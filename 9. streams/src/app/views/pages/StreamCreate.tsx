import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { streamsOperations } from '../../state/ducks/streams';
import { StreamsState } from '../../state/ducks/streams/types';
import { AppState } from '../../state/store';
import { StreamForm } from '../components';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = { createStream: streamsOperations.createStream };

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

// interface MyProps {}

type Props = PropsFromRedux; // & MyProps

/* -------------------------------- Component ------------------------------- */

const StreamCreate: React.FC<Props> = ({ createStream }: Props) => {
  const onSubmit = (formValues: StreamsState) => {
    // console.log(formValues);
    createStream(formValues);
  };

  return (
    <>
      <h3>Create a Stream</h3>
      <StreamForm onFormSubmit={onSubmit} />
    </>
  );
};

export default connector(StreamCreate);

// https://react-hook-form.com/get-started#Quickstart
// https://react-hook-form.com/api#useForm
