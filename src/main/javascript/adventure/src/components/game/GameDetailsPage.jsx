import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {useHistory, useParams} from 'react-router-dom';
import {useGameWithId} from './UseGameWithId';
import React, {useState} from 'react';
import EditButtonRow from '../buttons/EditButtonRow/EditButtonRow';
import {deleteGame, getGameById, replaceGame} from '../../utilities/client';
import {CurrentPlayersCharactersSelect} from '../character/CharacterSelect';
import {ChevronRightButton, FaceButton, MenuButton} from '../buttons/Buttons';
import CharacterDetails from '../character/CharacterDetails';
import CenteredGrid from '../shared/CenteredGrid';
import clsx from 'clsx';
import SendButton from '../buttons/SendButton';
import {drawerWidth, useStyles} from '../Styles';
import {useDeleteDialog} from '../shared/UseDeleteDialog';

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
  const classes = useStyles();

  function CharacterDetailsDrawerContent({character, setCharacter}) {
    return <List>
      <ListItem>
        <ListItemText primary={
          <CurrentPlayersCharactersSelect onSelect={setCharacter}/>
        }/>
      </ListItem>
      <ListItem>
        {selectedCharacter && <CharacterDetails character={character}
                                                setCharacter={setCharacter}/>}
      </ListItem>
    </List>;
  }

  const drawerContent = <CharacterDetailsDrawerContent character={selectedCharacter}
                                                       setCharacter={setSelectedCharacter}/>;

  const {openDialog, DeleteDialog} = useDeleteDialog(`Delete Game ${game?.name || ''}`, onDelete);

  return !players
    ? 'Loading...'
    : <Box>
      <AppBar color='default' position='static' className={clsx(classes.appBar, {
        [classes.appBarShift]: isCharacterDrawerOpen,
      })}>
        <Toolbar>
          <Box display={'flex'} flexDirection={'row'} width={'100%'} alignItems={'center'} flexWrap={'wrap'}>
            <Box flexGrow={1} flexShrink={0}>
              <Typography variant='h6'>{title}</Typography>
            </Box>
            <EditButtonRow
              isEditing={isEditing}
              onDelete={openDialog}
              onSave={onSave}
              onCancelEdit={onCancelEdit}
              onEdit={onEdit}
            />
            {!isCharacterDrawerOpen && <MenuButton onClick={openCharacterDrawer}/>}
            {isCharacterDrawerOpen && <ChevronRightButton onClick={closeCharacterDrawer}/>}
          </Box>
        </Toolbar>
      </AppBar>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isCharacterDrawerOpen,
        })}
      >
        <Box>
          <CenteredGrid>
            {players.map((player) => <Box p={1} border={1}>{player}</Box>)}
          </CenteredGrid>
        </Box>
      </main>

      <Drawer
        variant="persistent"
        anchor="right"
        open={isCharacterDrawerOpen}
        className={classes.drawer}
        classes={classes.drawerPaper}
      >
        <Box width={drawerWidth} className={classes.appBarOffset}/>
        <Toolbar>
          <FaceButton/>
          <SendButton/>
        </Toolbar>
        <Divider/>
        <Box width={drawerWidth}>
          {drawerContent}
        </Box>
      </Drawer>
      <DeleteDialog/>
    </Box>;
};

export default GameDetailsPage;
