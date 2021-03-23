export const getCurrentPlayer = () => fetch('/players/current');

export const getCurrentPlayersCharacters = () => fetch('/players/current/characters');



export const getCharacterById = characterId => fetch(`/characters/${characterId}`);

export const postNewCharacter = () => fetch('/characters', {method: 'POST'});

export const replaceCharacter = character =>
  fetch(`/characters/${character.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(character),
  });

export const deleteCharacter = character => fetch(`/characters/${character.id}`, {method: 'DELETE'});



export const getAllCards = () => fetch('/cards');

export const getCardById = (id) => fetch(`/cards/${id}`);

export const postNewCard = () => fetch('/cards', {method: 'POST'});

export const replaceCard = card =>
  fetch(`/cards/${card.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(card),
  });

export const deleteCard = character => fetch(`/characters/${character.id}`, {method: 'DELETE'});



const client = {
  getCurrentPlayer,
  getCurrentPlayersCharacters,

  getCharacterById,
  postNewCharacter,
  replaceCharacter,
  deleteCharacter,

  getAllCards,
  getCardById,
  replaceCard,
  deleteCard,
};

export default client;
