import {Box} from "@mui/material";
import useCurrentPlayersGames from "./UseCurrentPlayersGames";
import AddButton from "../buttons/AddButton";
import CenteredGridWithAppBar from "../shared/CenteredGridWithAppBar";
import {postNewGame} from "../../utilities/client";
import {useNavigate} from "react-router-dom";

const GamesPage = () => {

  const navigate = useNavigate();

  const GameBox = game => {
    return <Box
      p={1}
      border={1}
      onClick={() => navigate(`/games/${game.id}`)}
    >
      {game.name}
    </Box>;
  };

  const games = useCurrentPlayersGames();

  const createGame = () => postNewGame()
    .then(response => response.json())
    .then(json => navigate(`/games/${json.id}`));

  return <CenteredGridWithAppBar
    title={"Games"}
    menuItems={<AddButton onClick={createGame}/>}
  >
    {games.map(GameBox)}
  </CenteredGridWithAppBar>;
};

export default GamesPage;
