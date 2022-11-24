import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useGameWithId} from "./UseGameWithId";
import React, {useState} from "react";
import EditButtonRow from "../buttons/EditButtonRow/EditButtonRow";
import {deleteGame, getGameById, replaceGame} from "../../utilities/client";
import {CurrentPlayersCharactersSelect} from "../character/CharacterSelect";
import {ChevronRightButton, FaceButton, MenuButton} from "../buttons/Buttons";
import {CharacterDetailsContainer} from "../character/CharacterPage/CharacterDetailsContainer";
import CenteredGrid from "../shared/CenteredGrid";
import clsx from "clsx";
import SendButton from "../buttons/SendButton";
import {drawerWidth, useStyles} from "../Styles";
import {useDeleteDialog} from "../shared/UseDeleteDialog";
import {useCharactersCards} from "../character/UseCharactersCards";
import {TabbedCharacterPanels} from "../character/CharacterPage/TabbedCharacterPanel/TabbedCharacterPanels";
import {useWebSocket} from "../shared/UseWebSocket";

const GameAppBar = ({
  classes, isCharacterDrawerOpen, title, openDialog, game, onSave, onCancelEdit, onEdit,
  openCharacterDrawer, closeCharacterDrawer
}) => <AppBar color="default" position="static"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: isCharacterDrawerOpen,
              })}>
  <Toolbar>
    <Box display={"flex"} flexDirection={"row"} width={"100%"} alignItems={"center"} flexWrap={"wrap"}>
      <Box flexGrow={1} flexShrink={0}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <EditButtonRow
        onDelete={openDialog(`Delete Game ${game?.name || ""}`)}
        onSave={onSave}
        onCancelEdit={onCancelEdit}
        onEdit={onEdit}
      />
      {!isCharacterDrawerOpen && <MenuButton onClick={openCharacterDrawer}/>}
      {isCharacterDrawerOpen && <ChevronRightButton onClick={closeCharacterDrawer}/>}
    </Box>
  </Toolbar>
</AppBar>;

const CharacterDrawer = ({
  classes,
  isCharacterDrawerOpen,
  selectedCharacter,
  sendPayload,
  setSelectedCharacter
}) => {
  return <Drawer
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
      <CharacterDetailsDrawerContent
        character={selectedCharacter}
        setCharacter={setSelectedCharacter}
        sendPayload={sendPayload}
        selectedCharacter={selectedCharacter}
      />
    </Box>
  </Drawer>;
};

const CharacterDetailsDrawerContent = (props) => {
  const {character, setCharacter, sendPayload, selectedCharacter} = props;
  const {cards} = useCharactersCards(character);
  return <List>
    <ListItem>
      <ListItemText primary={
        <CurrentPlayersCharactersSelect onSelect={setCharacter}/>
      }/>
    </ListItem>
    {selectedCharacter && <ListItem>
      <CharacterDetailsContainer character={character}
                                 setCharacter={setCharacter}/>
    </ListItem>}
    {selectedCharacter && <ListItem>
      <TabbedCharacterPanels
        isEditing={false}
        cards={cards}
        setCards={() => {
        }}
        onPlay={sendPayload}
      />
    </ListItem>}
  </List>;
};

const GameDetailsPage = () => {
  const {gameId} = useParams();

  const navigate = useNavigate();

  const [isEditing, setEditing] = useState(false);

  const [game, setGame] = useGameWithId(gameId);

  const players = game["players"];

  const {webSocket, events} = useWebSocket();

  const sendPayload = (card) => {
    console.log({selectedCharacter, game});
    webSocket.current.send(JSON.stringify({
      event: "playCardEvent",
      characterId: selectedCharacter.id,
      cardId: card.id,
    }));
  };

  const editGameNameTextField =
    <TextField
      label="Game name"
      variant="outlined"
      fullWidth margin="dense"
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
  const onDelete = () => deleteGame(game).then(() => navigate("/games"));

  const [isCharacterDrawerOpen, setCharacterDrawerOpen] = useState(false);
  const openCharacterDrawer = () => setCharacterDrawerOpen(true);
  const closeCharacterDrawer = () => setCharacterDrawerOpen(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const classes = useStyles();

  const {openDialog, DeleteDialog} = useDeleteDialog(onDelete);

  return (
    <Box>
      <GameAppBar {...{classes, closeCharacterDrawer, game, isCharacterDrawerOpen, onCancelEdit, onEdit, onSave, openCharacterDrawer, openDialog, title,}} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isCharacterDrawerOpen,
        })}
      >
        <Box>
          <CenteredGrid>
            {!players ? <span>"Loading..."</span> : players.map((player) => <Box p={1} border={1}>{player}</Box>)}
          </CenteredGrid>
        </Box>
      </main>

      <CharacterDrawer {...{isCharacterDrawerOpen, classes, selectedCharacter, setSelectedCharacter, sendPayload}} />

      {webSocket.current && <Button onClick={() => sendPayload(selectedCharacter.cards[0])}>greeting</Button>}

      <Box>
        {events.map(x => x.data)}
      </Box>

      <DeleteDialog/>
    </Box>
  );
};

export default GameDetailsPage;
