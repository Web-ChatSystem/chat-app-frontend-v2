import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<Socket | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = (props: { children: ReactNode }): JSX.Element => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    // Lấy token từ localStorage (hoặc bất kỳ nơi nào bạn lưu trữ token)
    const token = localStorage.getItem("token"); // Giả sử token được lưu trữ trong localStorage

    if (token) {
      // Nếu token có, thêm nó vào query khi kết nối với WebSocket
      const newSocket = io("https://chat-app-frontend-v2-9xdq.vercel.app/", {
        transports: ["websocket"],
        query: { token }, // Thêm token vào query
        reconnectionAttempts: 5, // Number of retry attempts
        timeout: 10000,
      });
      setSocket(newSocket);

      // Cleanup khi component unmount
      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    } else {
      console.error("Token is required");
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
