import {useEffect, useRef, useState} from "react";

export function useWebSocket() {
  const webSocket = useRef(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (webSocket.current) {
      return;
    }
    webSocket.current = new WebSocket("ws://localhost:8080/games");
    webSocket.current.onopen = () => {
      console.log("webSocket opened");
      // const data = new JsonMessage('Here\'s some text that the server is urgently awaiting!').asJson();
      // webSocket.current.send(data);
      // webSocket.current.send(JSON.stringify({}));
    };

    webSocket.current.onclose = () => console.log("webSocket closed");

    webSocket.current.onmessage = (event) => {
      console.log(event)
      // const message = JSON.parse(event.data);
      setEvents([...events, event]);
    };

    const webSocketCurrent = webSocket.current;
    return () => {
      webSocketCurrent.close();
    }
  });

  return {webSocket, events};
}
