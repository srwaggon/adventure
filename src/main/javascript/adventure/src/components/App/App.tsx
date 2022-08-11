import {AppBar, Box, Button, createTheme, StyledEngineProvider, Toolbar, Typography} from "@mui/material";
import {ThemeProvider} from "@mui/styles";

import React from "react";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import CardPage from "../cards/CardDetailsPage/CardDetailsPage";
import CardsPage from "../cards/CardsPage";
import {CharacterPage} from "../character/CharacterPage/CharacterPage";
import {CharactersPage} from "../character/CharactersPage/CharactersPage";
import GameDetailsPage from "../game/GameDetailsPage";
import GamesPage from "../game/GamesPage";
import {useStyles} from "../Styles";
import "./App.css";

const Navigation = () => {
  const history = useHistory();
  return <Toolbar>
    <Box display="flex" justifyContent={"space-between"} width={1} alignItems={"center"}
         flexWrap={"wrap"} ml={-1}>
      <Button color={"inherit"} onClick={() => history.push("/")}>
        <Typography variant="h4" style={{textTransform: "capitalize"}}>Alcheim
          Online</Typography>
      </Button>
      <Box>
        <Button color="inherit" onClick={() => history.push("/cards")}>Cards</Button>
        <Button color="inherit"
                onClick={() => history.push("/characters")}>Characters</Button>
        <Button color="inherit" onClick={() => history.push("/games")}>Games</Button>
        <Button color="inherit" href={"/logout"}>Logout</Button>
      </Box>
    </Box>
  </Toolbar>;
};

class JsonMessage {

  message: string;

  constructor(message: string) {
    this.message = message;
  }

  asJson = () => JSON.stringify(this);
}

const AppContent = () => {
  const classes = useStyles();
  return (<Box className="App">
      <Router>
        <AppBar position={"relative"} className={classes.headerBar}>
          <Navigation/>
        </AppBar>
        <Switch>
          <Route path="/cards/:cardId"><CardPage/></Route>
          <Route path="/cards"><CardsPage/></Route>
          <Route path="/characters/:characterId"><CharacterPage/></Route>
          <Route path="/characters"><CharactersPage/></Route>
          <Route path="/games/:gameId"><GameDetailsPage/></Route>
          <Route path="/games"><GamesPage/></Route>
          <Route path="/"><CharactersPage/></Route>
        </Switch>
      </Router>
    </Box>
  );
};

const App = () => {
  // useEffect(() => {
  //   const webSocket = new WebSocket('ws://localhost:8080/jsonMessage');
  //   webSocket.onopen = () => {
  //     const data = new JsonMessage('Here\'s some text that the server is urgently awaiting!').asJson();
  //     webSocket.send(data);
  //   };
  //
  //   webSocket.onmessage = (event) => console.log(event);
  // });

  const theme = createTheme();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppContent/>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
