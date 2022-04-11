import {useEffect, useState} from "react";
import {getAllCards} from "../../utilities/client";

const useCards = () => {
  const [cards, setCards] = useState([]);
  // const [cards, setCards] = useState(demoCards);

  useEffect(() => {
    getAllCards()
      .then(response => response.json())
      .then(setCards);

  }, [setCards]);

  return cards;
};
export default useCards;
