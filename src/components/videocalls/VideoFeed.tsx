import { forwardRef } from "react";

interface Props {
  isMuted?: boolean;
}

export const VideoFeed = forwardRef<HTMLVideoElement, Props>(
  ({ isMuted = false }, ref) => {
    return (
      <video
        ref={ref}
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
  }
);

VideoFeed.displayName = "VideoFeed";
