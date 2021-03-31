import {useEffect, useState} from 'react';
import {getGameById} from '../../utilities/client';

export function useGameWithId(gameId) {
  const [game, setGame] = useState({});

  useEffect(() => {
    getGameById(gameId)
      .then(response => response.json())
      .then(setGame);
  }, [gameId, setGame]);

  return [game, setGame];
}