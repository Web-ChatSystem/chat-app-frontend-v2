import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Peer from 'simple-peer';
export const servers = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: "51200850a53768a3f5ac0cf0",
      credential: "aEHI+K2LsLXavRNd",
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "51200850a53768a3f5ac0cf0",
      credential: "aEHI+K2LsLXavRNd",
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: "51200850a53768a3f5ac0cf0",
      credential: "aEHI+K2LsLXavRNd",
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: "51200850a53768a3f5ac0cf0",
      credential: "aEHI+K2LsLXavRNd",
    },
  ],
  iceCandidatePoolSize: 10
};
export function useOfferSending(peerRef: React.MutableRefObject<Peer.Instance | undefined>, localVideoRef: React.MutableRefObject<HTMLVideoElement | null>, remoteVideoRef: React.MutableRefObject<HTMLVideoElement | null>) {
  const socket = useSocket();
  const { id } = useParams();

  const sendOffer = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log("LocalVideoRef", localVideoRef);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    const peer1 = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: servers
    });
    peer1.on('signal', data => {
      // when peer1 has signaling data, give it to peer2 somehow
      socket?.emit(SOCKET_EVENTS.CLIENT.SEND_CONNECTION_OFFER, {
        roomName: id,
        offer: data,
      });
    })
    peer1.on('stream', stream => {
      console.log("stream-1", stream, remoteVideoRef.current)
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    })
    peerRef.current = peer1;

  }, [id, localVideoRef, peerRef, remoteVideoRef, socket]);

  return { sendOffer };
}
