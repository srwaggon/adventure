import React, {useState} from 'react';

import {Card} from '@material-ui/core';
import DeleteButton from '../../buttons/DeleteButton';
import {arrayRemoveAt} from '../../../utilities/kitchen_sink';
import {replaceCharacter} from '../../../utilities/client';
import CenteredGridWithAppBar from './CenteredGridWithAppBar';
import CardFilter from '../../cards/CardFilter';
import SpecialCard from '../../cards/specialcard/SpecialCard';
import {Link} from 'react-router-dom';

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

  const items = filterFunc(cards).map((card, index) =>
    <Card>
      <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
        <SpecialCard {...card}/>
      </Link>
      <DeleteButton disabled={!isEditing} onClick={() => removeCardFromCharacter(index)}/>
    </Card>);

  return <CenteredGridWithAppBar title={'Cards'} items={items}>
    <CardFilter {...{setFilterFunc}} />
  </CenteredGridWithAppBar>;
};

export default CharacterCards;