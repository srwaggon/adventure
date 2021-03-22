export const getCurrentPlayer = () => fetch('/players/current');

export const getCurrentPlayersCharacters = () => fetch('/players/current/characters');

export const putNewCharacter = character =>
  fetch('/characters', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(character),
  });

export const postCharacter = character =>
  fetch(`/characters/${character.id}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(character),
  });

export const getCharacterById = characterId => fetch(`/characters/${characterId}`);

const client = {
  getCurrentPlayer,
  getCurrentPlayersCharacters,
  getCharacterById,
  putNewCharacter,
  postCharacter,
};

export default client;
