import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Peer from 'simple-peer';
import { servers } from "./useOfferSending";

export function useSendingAnswer(peerRef: React.MutableRefObject<Peer.Instance | undefined>, localVideoRef: React.MutableRefObject<HTMLVideoElement | null>, remoteVideoRef: React.MutableRefObject<HTMLVideoElement | null>) {
  const { id } = useParams();
  const socket = useSocket();
  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("OFFER peer2", offer);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      const peer2 = new Peer({
        initiator: false,
        trickle: false,
        stream,
        config: servers
      });
      peer2.on('signal', data => {
        socket?.emit(SOCKET_EVENTS.CLIENT.ANSWER, { answer: data, roomName: id });
      })
      peer2.on('stream', stream => {
        console.log("Stream-2", stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      })
      peer2.signal(offer);
      peerRef.current = peer2;
    },
    [id, localVideoRef, peerRef, remoteVideoRef, socket],
  );
  return {
    handleConnectionOffer,
  };
}
