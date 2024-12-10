import { FunctionComponent } from "react";

interface Props {
  mediaStream: MediaStream | null;
  isMuted?: boolean;
}

export const VideoFeed: FunctionComponent<Props> = ({
  mediaStream,
  isMuted = false,
}) => {
  return (
    <video
      ref={(ref) => {
        if (ref) {
          ref.srcObject = mediaStream;
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8%",
        objectFit: "cover",
      }}
      autoPlay={true}
      muted={isMuted}
    />
  );
};
