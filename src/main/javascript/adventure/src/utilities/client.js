export const getCurrentPlayer = () => fetch('/players/current');

export const getCurrentPlayersCharacters = () => fetch('/players/current/characters');

export const putNewCharacter = () =>
  fetch('/characters', {
    method: 'PUT'
  });

export const postCharacter = character =>
  fetch(`/characters/${character.id}`, {
    method: 'POST',
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
  putNewCharacter,
  postCharacter,
  deleteCharacter,
};

export default client;
