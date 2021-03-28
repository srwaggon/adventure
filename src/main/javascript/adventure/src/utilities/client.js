const _get = (endpoint) => () => fetch(endpoint);
const _getAll = _get;
const _getById = (endpoint) => (id) => fetch(`${endpoint}/${id}`);
const _postNew = (endpoint) => (item) => fetch(endpoint, {
  method: 'POST',
  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
  body: JSON.stringify(item),
});
const _replace = (endpoint) => (item) =>
  fetch(`${endpoint}/${item.id}`, {
    method: 'PUT',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(item),
  });
const _delete = (endpoint) => (item) => fetch(`${endpoint}/${item.id}`, {method: 'DELETE'});

const playersEndpoint = '/api/players';
export const getAllPlayers = _getAll(playersEndpoint);
export const getPlayerById = _getById(playersEndpoint);
export const postNewPlayer = _postNew(playersEndpoint);
export const replacePlayer = _replace(playersEndpoint);
export const deletePlayer = _delete(playersEndpoint);
export const getCurrentPlayer = _get(`${playersEndpoint}/current`);
export const getCurrentPlayersCharacters = _get(`${playersEndpoint}/current/characters`);

const charactersEndpoint = '/api/characters';
export const getAllCharacters = _getAll(charactersEndpoint);
export const getCharacterById = _getById(charactersEndpoint);
export const postNewCharacter = _postNew(charactersEndpoint);
export const replaceCharacter = _replace(charactersEndpoint);
export const deleteCharacter = _delete(charactersEndpoint);
export const getCharactersCards = (characterId) => _get(`${charactersEndpoint}/${characterId}/cards`)();

const cardsEndpoint = '/api/cards';
export const getAllCards = _getAll(cardsEndpoint);
export const getCardById = _getById(cardsEndpoint);
export const postNewCard = _postNew(cardsEndpoint);
export const replaceCard = _replace(cardsEndpoint);
export const deleteCard = _delete(cardsEndpoint);
export const getCardTypes = _get(`${cardsEndpoint}/types`);

const proficienciesEndpoint = '/api/proficiencies';
export const getAllProficiencies = _getAll(proficienciesEndpoint);

export const client = {
  getAllPlayers,
  getPlayerById,
  postNewPlayer,
  replacePlayer,
  deletePlayer,
  getCurrentPlayer,
  getCurrentPlayersCharacters,

  getAllCharacters,
  getCharacterById,
  postNewCharacter,
  replaceCharacter,
  deleteCharacter,

  getAllCards,
  getCardById,
  postNewCard,
  replaceCard,
  deleteCard,
};

export default client;
