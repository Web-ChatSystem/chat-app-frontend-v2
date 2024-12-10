import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { useSocket } from "@/provider/socketProvider.tsx";
import { useOfferSending } from "./useOfferSending";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useSendingAnswer } from "./useSendingAnswer";
import { useGetMe } from "./useGetMe";
import { useAnswerProcessing } from "./useAnswerProcessing";
import Peer from 'simple-peer';


export function useChatConnection(localVideoRef: React.MutableRefObject<HTMLVideoElement | null>, remoteVideoRef: React.MutableRefObject<HTMLVideoElement | null>) {
  const socket = useSocket();
  const self = useGetMe();
  const params = useParams();
  const roomName = params.id;
  const peerRef = useRef<Peer.Instance>();

  const { sendOffer } = useOfferSending(peerRef, localVideoRef, remoteVideoRef);

  const { handleConnectionOffer } = useSendingAnswer(peerRef, localVideoRef, remoteVideoRef);

  const { handleOfferAnswer } = useAnswerProcessing(peerRef);

  const handleConnection = useCallback(() => {
    if (roomName && self?.data?.username) {
      socket?.emit(SOCKET_EVENTS.CLIENT.JOIN_ROOM, {
        roomName,
        userName: self.data.username,
      });
    }
  }, [roomName, self?.data?.username, socket]);

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", handleConnection);
    socket?.on(SOCKET_EVENTS.SERVER.ANOTHER_PERSON_READY, sendOffer);
    socket?.on(
      SOCKET_EVENTS.SERVER.SEND_CONNECTION_OFFER,
      handleConnectionOffer,
    );
    socket?.on(SOCKET_EVENTS.SERVER.ANSWER, handleOfferAnswer);
    // xu li end call
    //socket?.on(SOCKET_EVENTS.SERVER.ANOTHER_PERSON_DECLINE, {});
    return () => {
      socket?.off("connect", handleConnection);
      socket?.off(SOCKET_EVENTS.SERVER.ANOTHER_PERSON_READY, sendOffer);
      socket?.off(
        SOCKET_EVENTS.SERVER.SEND_CONNECTION_OFFER,
        handleConnectionOffer,
      );
      socket?.off(SOCKET_EVENTS.SERVER.ANSWER, handleOfferAnswer);
      //socket?.off(SOCKET_EVENTS.SERVER.ANOTHER_PERSON_DECLINE, {});
    };
  }, [roomName, handleConnection, socket, sendOffer, handleConnectionOffer, handleOfferAnswer]);
}
