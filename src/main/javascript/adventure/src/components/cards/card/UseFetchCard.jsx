import {useEffect, useState} from "react";
import {useNewCard} from "./UseNewCard";
import {getCardById} from "../../../utilities/client";

export const useFetchCard = (cardId) => {

  const [card, setCard] = useState(null);

  const newCard = useNewCard();

  useEffect(() => {
    function getCard() {
      getCardById(cardId)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then(setCard)
        .catch((error) => {
          console.log(error);
          setCard({...newCard});
        });
    }

    if (card && (cardId === card.id || cardId === "new")) {
      return;
    }
    if (!cardId || cardId === "new") {
      setCard({...newCard});
    } else {
      getCard();
    }
  }, [cardId, card, setCard, newCard]);

  return card;
};
