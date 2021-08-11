import {useEffect, useRef} from 'react';

export function useWebSocket() {
  const webSocket = useRef(null);

  useEffect(() => {
    if (webSocket.current) {
      return;
    }
    webSocket.current = new WebSocket('ws://localhost:8080/games');
    webSocket.current.onopen = () => {
      // const data = new JsonMessage('Here\'s some text that the server is urgently awaiting!').asJson();
      // webSocket.current.send(data);
      // webSocket.current.send(JSON.stringify({}));
    };

    webSocket.current.onmessage = (event) => console.log(event);
  });

  return webSocket;
}
