import React, {useState} from 'react';

import {Card} from '@material-ui/core';
import DeleteButton from '../../buttons/DeleteButton';
import {arrayRemoveAt} from '../../../utilities/kitchen_sink';
import {replaceCharacter} from '../../../utilities/client';
import CardGridWithAppBar from './CardGridWithAppBar';

const CharacterCards = ({isEditing, cards, character, setCharacter, fetchCharactersCards}) => {

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const removeCardFromCharacter = index => {
    const newCards = arrayRemoveAt([...cards], index).map(x => x.id);
    const newCharacter = {...character, cards: newCards};
    replaceCharacter(newCharacter)
      .then(response => response.json())
      .then(json => {
        setCharacter(json);
        fetchCharactersCards(character);
      });
  };

  const cardDecorator = ({children, index}) =>
    <Card>
      {children}
      <DeleteButton disabled={!isEditing} onClick={() => removeCardFromCharacter(index)}/>
    </Card>;

  return <CardGridWithAppBar
    title={'Cards'}
    cards={cards}
    filterFunc={filterFunc}
    setFilterFunc={setFilterFunc}
    cardDecorator={cardDecorator}
  />;
};

export default CharacterCards;