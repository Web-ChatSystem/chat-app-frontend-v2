import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

export function useOfferSending(peerConnection: RTCPeerConnection) {
  const socket = useSocket();
  const { id } = useParams();

  const sendOffer = useCallback(async () => {
    if (peerConnection.signalingState === "closed") {
      console.error("RTCPeerConnection is closed. Cannot create offer.");
      return;
    }

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket?.emit(SOCKET_EVENTS.CLIENT.SEND_CONNECTION_OFFER, {
        roomName: id,
        offer,
      });
    } catch (error) {
      console.error("Error while creating offer:", error);
    }
  }, [id, peerConnection, socket]);

  return { sendOffer };
}
