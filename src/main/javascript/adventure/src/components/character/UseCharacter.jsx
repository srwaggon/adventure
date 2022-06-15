import {useEffect, useState} from "react";
import {getCharacterById} from "../../utilities/client";

export function useCharacter(characterId) {
  const [character, setCharacter] = useState(null);
  // const [character, setCharacter] = useState(demoCharacter);

  const shouldFetchCharacter = !character || characterId !== character.id;
  useEffect(() => {
    if (shouldFetchCharacter) {
      getCharacterById(characterId)
        .then(response => response.json())
        .then(setCharacter);
    }
  }, [shouldFetchCharacter, characterId]);
  return {character, setCharacter};
}
