import {Box} from '@material-ui/core';
import useCurrentPlayersGames from './UseCurrentPlayersGames';
import AddButton from '../buttons/AddButton';
import CenteredGridWithAppBar from '../shared/CenteredGridWithAppBar';

const GamesPage = () => {

  const games = useCurrentPlayersGames();

  return <CenteredGridWithAppBar
    title={'Games'}
    menuItems={<AddButton onClick={() => alert('phat booty')}/>}
  >
    {games.map(g => <Box p={1} border={1}>{g.name || g.id}</Box>)}
  </CenteredGridWithAppBar>;
};

export default GamesPage;