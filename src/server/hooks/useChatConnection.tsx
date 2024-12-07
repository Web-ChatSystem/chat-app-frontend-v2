import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSocket } from "@/provider/socketProvider.tsx";
import { useOfferSending } from "./useOfferSending";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useSendingAnswer } from "./useSendingAnswer";
import { useGetMe } from "./useGetMe";
import { useAnswerProcessing } from "./useAnswerProcessing";

export function useChatConnection(peerConnection: RTCPeerConnection) {
  const socket = useSocket();
  const self = useGetMe();
  const params = useParams();
  const roomName = params.id;
  const { sendOffer } = useOfferSending(peerConnection);

  const { handleConnectionOffer } = useSendingAnswer(peerConnection);

  const { handleOfferAnswer } = useAnswerProcessing(peerConnection);

  const handleConnection = useCallback(() => {
    if (roomName && self?.data?.username) {
      console.log("NGUOI GOI LA TOI", self.data.username);
      socket?.emit(SOCKET_EVENTS.CLIENT.JOIN_ROOM, {
        roomName,
        userName: self.data.username,
      });
    }
  }, [roomName, self?.data?.username, socket]);

  const handleReceiveCandidate = useCallback(
    ({ candidate }: { candidate: RTCIceCandidate }) => {
      peerConnection.addIceCandidate(candidate);
    },
    [peerConnection],
  );

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", handleConnection);
    socket?.on(SOCKET_EVENTS.SERVER.ANOTHER_PERSON_READY, sendOffer);
    socket?.on(
      SOCKET_EVENTS.SERVER.SEND_CONNECTION_OFFER,
      handleConnectionOffer,
    );
    socket?.on(SOCKET_EVENTS.SERVER.ANSWER, handleOfferAnswer);
    socket?.on(SOCKET_EVENTS.SERVER.SEND_CANDIDATE, handleReceiveCandidate);
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
      socket?.off(SOCKET_EVENTS.SERVER.SEND_CANDIDATE, handleReceiveCandidate);
      //socket?.off(SOCKET_EVENTS.SERVER.ANOTHER_PERSON_DECLINE, {});
    };
  }, [
    roomName,
    handleConnection,
    socket,
    sendOffer,
    handleConnectionOffer,
    handleOfferAnswer,
    handleReceiveCandidate,
  ]);
}
