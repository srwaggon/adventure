export const getCurrentPlayer = () => fetch('/players/current');

export const getCurrentPlayersCharacters = () => fetch('/players/current/characters');

export const postNewCharacter = () =>
  fetch('/characters', {
    method: 'POST'
  });

export const putCharacter = character =>
  fetch(`/characters/${character.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(character),
  });

export const deleteCharacter = character =>
  fetch(`/characters/${character.id}`, {
    method: 'DELETE'
  });

export const getCharacterById = characterId => fetch(`/characters/${characterId}`);

const client = {
  getCurrentPlayer,
  getCurrentPlayersCharacters,
  getCharacterById,

  postNewCharacter,
  putCharacter,
  deleteCharacter,
};

export default client;
