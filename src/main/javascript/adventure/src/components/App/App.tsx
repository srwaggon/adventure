import {
    AppBar,
    Box,
    Button,
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";

import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import CardPage from "../cards/CardDetailsPage/CardDetailsPage";
import CardsPage from "../cards/CardsPage";
import {CharacterPage} from "../character/CharacterPage/CharacterPage";
import {CharactersPage} from "../character/CharactersPage/CharactersPage";
import GameDetailsPage from "../game/GameDetailsPage";
import GamesPage from "../game/GamesPage";
import "./App.css";

const Navigation = () => {
  const navigate = useNavigate();
  return <Toolbar>
    <Box display="flex" justifyContent={"space-between"} width={1} alignItems={"center"}
         flexWrap={"wrap"} ml={-1}>
      <Button color={"inherit"} onClick={() => navigate("/")}>
        <Typography variant="h4" style={{textTransform: "capitalize"}}>Alcheim
          Online</Typography>
      </Button>
      <Box>
        <Button color="inherit" onClick={() => navigate("/cards")}>Cards</Button>
        <Button color="inherit"
                onClick={() => navigate("/characters")}>Characters</Button>
        <Button color="inherit" onClick={() => navigate("/games")}>Games</Button>
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
  return (<Box className="App">
      <BrowserRouter>
          <AppBar position={"relative"}>
          <Navigation/>
        </AppBar>
        <Routes>
          <Route path="/cards/:cardId" element={<CardPage/>}/>
          <Route path="/cards" element={<CardsPage/>}/>
          <Route path="/characters/:characterId" element={<CharacterPage/>}/>
          <Route path="/characters" element={<CharactersPage/>}/>
          <Route path="/games/:gameId" element={<GameDetailsPage/>}/>
          <Route path="/games" element={<GamesPage/>}/>
          <Route path="/" element={<CharactersPage/>}/>
        </Routes>
      </BrowserRouter>
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
