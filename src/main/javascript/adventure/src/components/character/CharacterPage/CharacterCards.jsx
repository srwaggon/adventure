import {AppBar, Card, CardContent, Toolbar, Typography} from '@material-ui/core';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';
import CardsGrid from '../../cards/CardsGrid';
import DeleteButton from '../../buttons/DeleteButton';
import {arrayRemoveAt} from '../../../utilities/kitchen_sink';
import {replaceCharacter} from '../../../utilities/client';
import React from 'react';

const CharacterCards = ({
  isEditing,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  cards,
  character,
  setCharacter,
  fetchCharactersCards,
}) => {
  return <Card>
    <AppBar color='default' position='static'>
      <Toolbar>
        <Typography variant='h6' style={{flexGrow: 1}}>Cards</Typography>
        <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}}/>
      </Toolbar>
    </AppBar>
    <CardContent>
      <CardsGrid
        cards={cards}
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