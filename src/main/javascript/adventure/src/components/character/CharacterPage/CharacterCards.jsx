import {Card, CardContent} from '@material-ui/core';
import CardsGrid from '../../cards/CardsGrid';
import DeleteButton from '../../buttons/DeleteButton';
import {arrayRemoveAt} from '../../../utilities/kitchen_sink';
import {replaceCharacter} from '../../../utilities/client';
import React, {useState} from 'react';
import CardFilterAppBar from '../../cards/CardFilterAppBar';

const CharacterCards = ({
  isEditing,
  cards,
  character,
  setCharacter,
  fetchCharactersCards,
}) => {

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  return <Card>
    <CardFilterAppBar title={'Cards'} setFilterFunc={setFilterFunc}/>
    <CardContent>
      <CardsGrid
        cards={filterFunc(cards)}
        CardDecorator={({children, index}) =>
          <Card>
            {children}
            <DeleteButton
              disabled={!isEditing}
              onClick={() => {
                const newCards = arrayRemoveAt([...cards], index).map(x => x.id);
                const newCharacter = {...character, cards: newCards};
                replaceCharacter(newCharacter)
                  .then(response => response.json())
                  .then(json => {
                    setCharacter(json);
                    fetchCharactersCards(character);
                  });
              }}/>
          </Card>
        }
      />
    </CardContent>
  </Card>;
};

export default CharacterCards;