import {useEffect, useState} from "react";
import {getCurrentPlayer} from "../../utilities/client";

const useCurrentPlayer = () => {
  const [currentPlayer, setCurrentPlayer] = useState({});

  useEffect(() => {
    if (!currentPlayer) {
      getCurrentPlayer()
        .then((response) => response.json())
        .then(json => setCurrentPlayer(json));
    }
  }, [currentPlayer, setCurrentPlayer]);
  return currentPlayer;
};

export default useCurrentPlayer;
