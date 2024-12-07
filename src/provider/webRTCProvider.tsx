import { createContext, ReactNode, useContext } from "react";

export const WebRTCContext = createContext<MediaStream | null>(null);

export const useWebRTC = () => {
  return useContext(WebRTCContext);
};

export const WebRTCProvider = (props: {
  children: ReactNode;
  localStream: MediaStream | null;
}): JSX.Element => {
  const { children, localStream } = props;
  return (
    <WebRTCContext.Provider value={localStream}>
      {children}
    </WebRTCContext.Provider>
  );
};
