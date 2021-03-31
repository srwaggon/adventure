import {Box, TextField} from '@material-ui/core';
import {useHistory, useParams} from 'react-router-dom';
import {useGameWithId} from './UseGameWithId';
import CenteredGridWithAppBar from '../shared/CenteredGridWithAppBar';
import {useState} from 'react';
import EditButtonRow from '../buttons/EditButtonRow/EditButtonRow';
import {deleteGame, getGameById, replaceGame} from '../../utilities/client';

const GameDetailsPage = () => {
  const {gameId} = useParams();

  const history = useHistory();

  const [isEditing, setEditing] = useState(false);

  const [game, setGame] = useGameWithId(gameId);

  const players = game['players'];

  const editGameNameTextField =
    <TextField
      label='Game name'
      variant='outlined'
      fullWidth margin='dense'
      defaultValue={game.name || game.id}
      onChange={event => setGame({...game, name: event.target.value})}
    />;

  const title = isEditing ? editGameNameTextField : game.name || game.id;
  const onEdit = () => setEditing(true);
  const onCancelEdit = () => {
    setEditing(false);
    getGameById(game.id)
      .then(response => response.json())
      .then(setGame);
  };
  const onSave = () => {
    setEditing(false);
    replaceGame(game)
      .then(response => response.json())
      .then(setGame);
  };
  const onDelete = () => deleteGame(game).then(() => history.push('/games'));

  return !players
    ? 'Loading...'
    : <CenteredGridWithAppBar
      title={title}
      menuItems={
        <EditButtonRow isEditing={isEditing} onDelete={onDelete} onCancelEdit={onCancelEdit} onEdit={onEdit}
                       onSave={onSave}/>
      }>
      {players.map((player) => <Box p={1} border={1}>{player}</Box>)}
    </CenteredGridWithAppBar>;
};

export default GameDetailsPage;