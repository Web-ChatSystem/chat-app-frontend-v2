import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
export function useSendingAnswer(peerConnection: RTCPeerConnection) {
  const { id } = useParams();
  const socket = useSocket();
  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      console.log("ANSWER IN useSendingAnswer", answer);
      await peerConnection.setLocalDescription(answer);
      socket?.emit(SOCKET_EVENTS.CLIENT.ANSWER, { answer, roomName: id });
    },
    [id, peerConnection, socket],
  );
  return {
    handleConnectionOffer,
  };
}
