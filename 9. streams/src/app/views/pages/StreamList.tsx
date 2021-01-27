import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { streamsOperations } from '../../state/ducks/streams';
import { AppState } from '../../state/store';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = { fetchStreams: streamsOperations.fetchStreams };

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

/* -------------------------------- Component ------------------------------- */

// home/index
const StreamList: React.FC<Props> = ({ fetchStreams }) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  return <>StreamList</>;
};

export default connector(StreamList);
