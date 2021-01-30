/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const flvPlayerRef = useRef<flv.Player | null>(null);

  useEffect(() => {
    // fetch the stream on component mount in case of refresh
    fetchStream((match.params.id as unknown) as number);
  }, [fetchStream, match.params.id]);

  // both useEffects() update on id

  // wouldn't have been able to figure this one out without:
  // https://github.com/mickremedi/client/blob/610d2687e62af98b5d066000171db90ea80e14d7/src/components/streams/StreamShow.tsx
  useEffect(() => {
    if (flvPlayerRef.current || !stream) {
      return;
    }

    // create flv player
    flvPlayerRef.current = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${(match.params.id as unknown) as number}.flv`,
    });

    // attach flvPlayer to video element
    flvPlayerRef.current.attachMediaElement(videoRef.current as HTMLVideoElement);
    flvPlayerRef.current.load();
  }, [match.params.id, stream]);

  // cleanup flvPlayer when navigating away
  useEffect(() => {
    return () => {
      if (flvPlayerRef.current) {
        flvPlayerRef.current.destroy();
        flvPlayerRef.current = null;
      }
    };
  }, []);

  return !stream ? (
    <>Loading...</>
  ) : (
    <>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </>
  );
};

export default connector(StreamShow);

// if you are setting a prop to true (control={true}) you don't have to send true to the child.
// you can just send the property, and it will be the same thing
