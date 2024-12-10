import { useCallback } from "react";
import Peer from 'simple-peer';
export function useAnswerProcessing(peerRef: React.MutableRefObject<Peer.Instance | undefined>) {

  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      peerRef?.current?.signal(answer);

    },
    [peerRef],
  );
  return {
    handleOfferAnswer,
  };
}
