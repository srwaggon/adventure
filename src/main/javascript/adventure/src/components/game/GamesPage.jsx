import {Box} from '@material-ui/core';
import useCurrentPlayersGames from './UseCurrentPlayersGames';
import AddButton from '../buttons/AddButton';
import CenteredGridWithAppBar from '../shared/CenteredGridWithAppBar';
import {useHistory} from 'react-router-dom';
import {postNewGame} from '../../utilities/client';

function GameBox(game) {
  const history = useHistory();
  return <Box
    p={1}
    border={1}
    onClick={() => history.push(`/games/${game.id}`)}
  >
    {game.name || game.id}
  </Box>;
}

const GamesPage = () => {

  const history = useHistory();

  const games = useCurrentPlayersGames();

  const createGame = () => postNewGame()
    .then(response => response.json())
    .then(json => history.push(`/games/${json.id}`));

  return <CenteredGridWithAppBar
    title={'Games'}
    menuItems={<AddButton onClick={createGame}/>}
  >
    {games.map(GameBox)}
  </CenteredGridWithAppBar>;
};

export default GamesPage;