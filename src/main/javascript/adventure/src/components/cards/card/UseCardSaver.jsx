import {postNewCard, replaceCard} from "../../../utilities/client";

export const useCardSaver = () => (card) => {
  return (card.id === null ? postNewCard(card) : replaceCard(card))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
}
