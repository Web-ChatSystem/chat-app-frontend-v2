import { useParams } from "react-router-dom";
import { JSX, useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Grid,
  Group,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconPhone,
  IconVideo,
  IconVideoOff,
} from "@tabler/icons-react";
import { useSocket } from "@/provider/socketProvider";
import { SOCKET_EVENTS } from "@/utils/constant";
import { useChatConnection } from "@/server/hooks/useChatConnection";
import { VideoFeed } from "@/components/videocalls/VideoFeed";
import { useGetMe } from "@/server/hooks/useGetMe";

export default function VideoCallPage(): JSX.Element {
  const { id } = useParams();
  const socket = useSocket();
  const self = useGetMe();
  const [isVideoOn, setIsVideoOn] = useState(true); // Track video state
  const [isMicOn, setIsMicOn] = useState(true); // Track microphone state
  const [callEnded, setCallEnded] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useChatConnection(localVideoRef, remoteVideoRef);
  useEffect(() => {
    if (id && self?.data?.username) {
      socket?.emit(SOCKET_EVENTS.CLIENT.JOIN_ROOM, {
        roomName: id,
        userName: self?.data?.username,
      });
      socket?.on(SOCKET_EVENTS.SERVER.CALL_ENDED, () => {
        setCallEnded(true);
      });
    }
    return () => {
      socket?.off(SOCKET_EVENTS.SERVER.CALL_ENDED);
    };
  }, [id, self?.data?.username, socket]);

  const hangup = () => {
    if (socket) {
      if (id && self?.data?.username)
        socket.emit(SOCKET_EVENTS.CLIENT.HANGUP, {
          roomName: id,
          userName: self.data.username,
        });
    }
    window.close();
  };

  // Toggle video
  const toggleVideo = () => {
    const videoElement = localVideoRef.current;
    if (videoElement && videoElement.srcObject instanceof MediaStream) {
      const videoTrack = videoElement.srcObject.getTracks().find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    const videoElement = localVideoRef.current;
    if (videoElement && videoElement.srcObject instanceof MediaStream) {
      const audioTrack = videoElement.srcObject.getTracks().find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };
  if (!id) {
    return <>No id</>;
  }
  if (callEnded) {
    return (
      <Paper
        p={0}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
        }}
      >
        <Title order={2} color="white">
          Cuộc gọi đã kết thúc
        </Title>
      </Paper>
    );
  }
  console.log("remove", remoteVideoRef);
  return (
    <Paper
      p={0}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header */}
      <Group position="apart" p="md">
        <Group>

        </Group>
      </Group>

      {/* Main Content - Video/Avatar */}
      <Grid style={{ height: "calc(100vh - 160px)" }}>
        <Grid.Col span={6}>
          <Stack align="center" justify="center" style={{ height: "100%" }}>
            <VideoFeed ref={localVideoRef} />

          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack align="center" justify="center" style={{ height: "100%" }}>

            <VideoFeed ref={remoteVideoRef} />

          </Stack>
        </Grid.Col>
      </Grid>

      {/* Control Bar */}
      <Group
        position="center"
        spacing="xl"
        style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}
      >
        <ActionIcon
          size="xl"
          radius="xl"
          variant="filled"
          color="dark.4"
          onClick={toggleVideo}
        >
          {isVideoOn ? <IconVideo size={24} /> : <IconVideoOff size={24} />}
        </ActionIcon>
        <ActionIcon
          size="xl"
          radius="xl"
          variant="filled"
          color="dark.4"
          onClick={toggleMic}
        >
          {isMicOn ? (
            <IconMicrophone size={24} />
          ) : (
            <IconMicrophoneOff size={24} />
          )}
        </ActionIcon>
        <ActionIcon
          size="xl"
          radius="xl"
          variant="filled"
          color="red"
          onClick={hangup}
        >
          <IconPhone size={24} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
