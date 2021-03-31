import {Box} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {useGameWithId} from './UseGameWithId';
import CenteredGridWithAppBar from '../shared/CenteredGridWithAppBar';
import AddButton from '../buttons/AddButton';
import DeleteButton from '../buttons/DeleteButton';
import SaveButton from '../buttons/SaveButton';
import EditButton from '../buttons/EditButton';

const GameDetailsPage = () => {
  const {gameId} = useParams();

  const game = useGameWithId(gameId);

  const players = game['players'];

  return !players
    ? 'Loading...'
    : <CenteredGridWithAppBar
      title={game.name || game.id}
      menuItems={
        <>
          <AddButton onClick={() => alert('phat booty')}/>
          <SaveButton onClick={() => alert('liquid booty')}/>
          <EditButton onClick={() => alert('solid booty')}/>
          <DeleteButton onClick={() => alert('air booty')}/>
        </>
      }>
      {players.map((player) => <Box p={1} border={1}>{player}</Box>)}
    </CenteredGridWithAppBar>;
};

export default GameDetailsPage;