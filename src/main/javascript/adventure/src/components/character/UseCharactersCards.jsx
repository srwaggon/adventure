import {useEffect, useState} from "react";
import {getCharactersCards} from "../../utilities/client";

export function useCharactersCards(character) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCharactersCards = characterId => {
      getCharactersCards(characterId)
        .then(response => response.json())
        .then(setCards);
    };

    if (character && character.id) {
      fetchCharactersCards(character.id);
    }
  }, [character]);

  return {cards, setCards};
}
