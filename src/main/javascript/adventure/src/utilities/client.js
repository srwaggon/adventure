export const getCurrentPlayer = () => fetch('/players/current');

export const getCurrentPlayersCharacters = () => fetch('/players/current/characters');

export const postNewCharacter = character =>
  fetch('/characters', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(character),
  });

export const getCharacterById = characterId => fetch(`/characters/${characterId}`);

const client = {
  getCurrentPlayer,
  getCurrentPlayersCharacters,
  postNewCharacter,
  getCharacterById,
};

export default client;
