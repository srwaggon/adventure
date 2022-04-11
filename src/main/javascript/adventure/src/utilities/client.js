const _get = (endpoint) => () => fetch(endpoint);
const _getAll = _get;
const _getById = (endpoint) => (id) => fetch(`${endpoint}/${id}`);
const _getByIds = (endpoint) => (ids) => fetch(`${endpoint}?ids=${ids.join(",")}`);
const _postNew = (endpoint) => (item) => fetch(endpoint, {
  method: "POST",
  headers: {"Accept": "application/json", "Content-Type": "application/json"},
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
export const getCurrentPlayersGames = _get(`${playersEndpoint}/current/games`);

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
export const getCardsByIds = _getByIds(cardsEndpoint);
export const postNewCard = _postNew(cardsEndpoint);
export const replaceCard = _replace(cardsEndpoint);
export const deleteCard = _delete(cardsEndpoint);
export const getCardTypes = _get(`${cardsEndpoint}/types`);
export const getCardQualities = _get(`${cardsEndpoint}/qualities`);

const proficienciesEndpoint = '/api/proficiencies';
export const getAllProficiencies = _getAll(proficienciesEndpoint);

const gamesEndpoint = '/api/games';
export const getAllGames = _getAll(gamesEndpoint);
export const getGameById = _getById(gamesEndpoint);
export const postNewGame = _postNew(gamesEndpoint);
export const replaceGame = _replace(gamesEndpoint);
export const deleteGame = _delete(gamesEndpoint);
export const addPlayerToGame = (gameId, playerId) => fetch(`${gamesEndpoint}/${gameId}/players/${playerId}`,
  {method: 'PUT'});
export const removePlayerFromGame = (gameId, playerId) => fetch(`${gamesEndpoint}/${gameId}/players/${playerId}`,
  {method: 'DELETE'});

const editionEndpoint = '/api/editions';
export const getAllEditions = _getAll(editionEndpoint);

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

  getAllProficiencies,

  getAllGames,
  getGameById,
  postNewGame,
  replaceGame,
  deleteGame,
  addPlayerToGame,
  removePlayerFromGame,
};

export default client;
