import {Box, Divider, Drawer, List, ListItem, ListItemText, TextField} from '@material-ui/core';
import {useHistory, useParams} from 'react-router-dom';
import {useGameWithId} from './UseGameWithId';
import CenteredGridWithAppBar from '../shared/CenteredGridWithAppBar';
import {useState} from 'react';
import EditButtonRow from '../buttons/EditButtonRow/EditButtonRow';
import {deleteGame, getGameById, replaceGame} from '../../utilities/client';
import {CurrentPlayersCharactersSelect} from '../character/CharacterSelect';
import {ChevronRightButton, FaceButton, MenuButton} from '../buttons/Buttons';

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
      defaultValue={game.name}
      onChange={event => setGame({...game, name: event.target.value})}
    />;

  const title = isEditing ? editGameNameTextField : game.name;
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

  const [isCharacterDrawerOpen, setCharacterDrawerOpen] = useState(false);
  const openCharacterDrawer = () => setCharacterDrawerOpen(true);
  const closeCharacterDrawer = () => setCharacterDrawerOpen(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return !players
    ? 'Loading...'
    : <CenteredGridWithAppBar
      title={title}
      menuItems={
        <>
          <EditButtonRow
            isEditing={isEditing}
            onDelete={onDelete}
            onSave={onSave}
            onCancelEdit={onCancelEdit}
            onEdit={onEdit}
          />
          <FaceButton onClick={openCharacterDrawer}/>
          <MenuButton onClick={openCharacterDrawer}/>
        </>
      }>
      {players.map((player) => <Box p={1} border={1}>{player}</Box>)}
      <Drawer
        // className={classes.drawer}
        // classes={{paper: classes.drawerPaper,}}
        variant="persistent"
        anchor="right"
        open={isCharacterDrawerOpen}
      >
        <Box width={300}>
          <Box p={1}>
            <ChevronRightButton onClick={closeCharacterDrawer}/>
          </Box>
          <Divider/>
          <List>
            <ListItem>
              {/*<ListItemIcon><FaceIcon/></ListItemIcon>*/}
              <ListItemText primary={
                <CurrentPlayersCharactersSelect onSelect={setSelectedCharacter}/>
              }/>
            </ListItem>
          </List>
        </Box>
      </Drawer>

    </CenteredGridWithAppBar>;
};

export default GameDetailsPage;