import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function usePeerConnection(localStream: MediaStream | null) {
  const socket = useSocket();
  const { id } = useParams();
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    // Dọn dẹp kết nối cũ nếu có
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Tạo kết nối mới
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
    });

    connection.addEventListener("track", ({ streams }) => {
      setGuestStream(streams[0]);
    });

    // Thêm các track từ localStream vào kết nối
    localStream?.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });

    // Lắng nghe sự kiện ICE candidate
    connection.addEventListener("icecandidate", ({ candidate }) => {
      // Chỉ gửi candidate nếu remote description đã có
      if (candidate && connection.remoteDescription) {
        socket?.emit(SOCKET_EVENTS.CLIENT.SEND_CANDIDATE, {
          candidate,
          roomName: id,
        });
      }
    });

    // Gán connection vào ref
    peerConnectionRef.current = connection;

    // Cleanup khi component unmount hoặc dependencies thay đổi
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [localStream, id, socket]);

  // Tạo offer khi cần và thiết lập remoteDescription
  const createOffer = async () => {
    if (peerConnectionRef.current) {
      try {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        // Sau khi có offer, gửi tới server hoặc xử lý
        socket?.emit(SOCKET_EVENTS.CLIENT.SEND_CONNECTION_OFFER, {
          offer,
          roomName: id,
        });
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    }
  };

  // Nhận answer và thiết lập remoteDescription
  const handleAnswer = async (answer: RTCSessionDescription) => {
    if (peerConnectionRef.current) {
      try {
        await peerConnectionRef.current.setRemoteDescription(answer);
      } catch (error) {
        console.error("Error setting remote description:", error);
      }
    }
  };

  const cleanupConnection = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.getSenders().forEach((sender) => {
        sender.track?.stop();
      });
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setGuestStream(null);
  };

  return {
    peerConnection: peerConnectionRef.current!,
    guestStream,
    createOffer,
    handleAnswer,
    cleanupConnection,
  };
}
