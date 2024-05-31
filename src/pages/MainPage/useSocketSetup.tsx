import { useEffect } from "react"
import socket from "../../socket"

const useSocketSetup = () => {
    useEffect(() => {
        socket.connect();
        socket.on("new-place-created", (newPlace) => {
            console.log("New place created:", newPlace);
        });
    }, []);
}

export default useSocketSetup;