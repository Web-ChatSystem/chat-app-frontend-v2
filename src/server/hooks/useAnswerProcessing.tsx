import { useCallback } from "react";
import { useLocalCameraStream } from "./useLocalCameraStream";

export function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  const { localStream } = useLocalCameraStream();
  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      localStream?.getTracks().forEach((track) => {
        //console.log("TRACK", track);
        peerConnection.addTrack(track, localStream);
      });
      // neu ko chahy duoc thi cop ben usePeerConnection vao
      //console.log("ANSWER", answer);
      peerConnection.setRemoteDescription(answer);
    },
    [localStream, peerConnection],
  );

  return {
    handleOfferAnswer,
  };
}
