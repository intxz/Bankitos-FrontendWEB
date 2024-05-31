import { useEffect } from "react";
import socket from "../../socket";
import { toast } from 'react-toastify';

const useSocketSetup = () => {
  useEffect(() => {
    socket.connect();
    socket.on("new-place-created", (newPlace) => {
      // Show toast notification
      toast.success(`New place created: ${newPlace}`);
    });

    socket.on("user-logged-in", () => {
        // Show toast notification
        toast.success(`User logged in`);
      });

    return () => {
      // Disconnect socket on unmount
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure useEffect runs only once
};

export default useSocketSetup;
