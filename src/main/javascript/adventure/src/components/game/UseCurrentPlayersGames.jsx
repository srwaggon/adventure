import {useEffect, useState} from 'react';
import {getCurrentPlayersGames} from '../../utilities/client';

const useCurrentPlayersGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getCurrentPlayersGames()
      .then(response => response.json())
      .then(setGames);
  }, [setGames]);

  return games;
};

export default useCurrentPlayersGames;
