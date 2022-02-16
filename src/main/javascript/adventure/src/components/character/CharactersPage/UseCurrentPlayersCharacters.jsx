import {useEffect, useState} from "react";
import {getCurrentPlayersCharacters} from "../../../utilities/client";

function useCurrentPlayersCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCurrentPlayersCharacters()
      .then(response => response.json())
      .then(setCharacters);
  }, [setCharacters]);

  return characters;
}

export default useCurrentPlayersCharacters;
