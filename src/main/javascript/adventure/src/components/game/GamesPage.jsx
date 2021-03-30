import {Box, Container} from '@material-ui/core';
import CenteredGrid from '../shared/CenteredGrid';
import useCurrentPlayersGames from './UseCurrentPlayersGames';
import TitledAppBar from '../shared/TitledAppBar';
import AddButton from '../buttons/AddButton';

const GamesPage = () => {
  const games = useCurrentPlayersGames();
  return <Box>
    <TitledAppBar title={'Games'}>
      <AddButton onClick={() => alert('phat booty')}/>
    </TitledAppBar>
    <Container>
      <CenteredGrid>
        {games.map(g => <Box p={1} border={1}>{g.name || g.id}</Box>)}
      </CenteredGrid>
    </Container>
  </Box>;
};

export default GamesPage;