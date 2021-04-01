import React, {useState} from 'react';

import {Badge, Box, Card} from '@material-ui/core';
import DeleteButton from '../../buttons/DeleteButton';
import {arrayRemoveAt} from '../../../utilities/kitchen_sink';
import {replaceCharacter} from '../../../utilities/client';
import CenteredGridWithAppBar from './../../shared/CenteredGridWithAppBar';
import CardFilter from '../../cards/CardFilter';
import VisualCard from '../../cards/VisualCard/VisualCard';
import {Link} from 'react-router-dom';
import PlayButton from '../../buttons/PlayButton';
import SendButton from '../../buttons/SendButton';
import BrokenImageButton from '../../buttons/BrokenImageButton';

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
        <VisualCard {...card}/>
      </Link>
      <Box display='flex' flexDirection='row'>
        <DeleteButton disabled={!isEditing} onClick={() => removeCardFromCharacter(index)}/>
        <Badge badgeContent={4} color='secondary' overlap='circle'>
          <BrokenImageButton/>
        </Badge>
        <PlayButton/>
        <SendButton/>
      </Box>
    </Card>);

  return <Card>
    <CenteredGridWithAppBar
      title={'Cards'}
      menuItems={
        <CardFilter {...{setFilterFunc}} />
      }>
      {items}
    </CenteredGridWithAppBar>
  </Card>;
};

export default CharacterCards;