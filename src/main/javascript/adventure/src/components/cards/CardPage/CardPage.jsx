import {
  AppBar,
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SpecialCard from '../specialcard/SpecialCard';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {deleteCard, getCardById, getCurrentPlayer, postNewCard, replaceCard} from '../../../utilities/client';
import EditButtonRow from '../../buttons/EditButtonRow/EditButtonRow';

const newCard = () => ({
  name: undefined,
  image: undefined,
  imageSize: '100%',
  type: 'ABILITY',
  body: undefined,
  flavor: undefined,
});

const CardPage = () => {

  const {cardId} = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    function getCard() {
      getCardById(cardId)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then(json => {
          console.log('setting', json);
          setCard(json);
        })
        .catch((error) => {
          console.log(error);
          setCard({...newCard()});
        });
    }

    if (card) {
      return;
    }
    if (!cardId || cardId === 'new') {
      setCard({...newCard()});
    } else {
      getCard();
    }
  }, [cardId, card]);

  const [author, setAuthor] = useState(undefined);

  useEffect(() => {
    if (!author) {
      getCurrentPlayer()
        .then((response) => response.json())
        .then(json => setAuthor(json.name));
    }
  }, [author, setAuthor]);

  const history = useHistory();
  const [isEditing, setEditing] = useState(false);
  const onEdit = () => setEditing(true);
  const onCancelEdit = () => setEditing(false);
  const onSave = () => (!card.id ? postNewCard({...card, author}) : replaceCard(card))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(card => history.push(`/cards/${card.id}`))
    .catch(error => console.log(error));
  const onDelete = () => deleteCard(card).then(() => history.push('/cards'));

  return !card
    ? <span>Loading...</span>
    : <div>
      <AppBar color='default' position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow: 1}}>Card Details</Typography>
          <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}} />
        </Toolbar>
      </AppBar>
      <Box p={4} display='flex' flexDirection='row' justifyContent='space-evenly'>
        <SpecialCard {...card} />
        <Card>
          <Box p={4} display='flex' flexDirection='column' width={'20rem'}>
            <TextField label={'Name'} variant={'outlined'} fullWidth margin={'dense'}
                       defaultValue={card.name} onChange={event => setCard({...card, name: event.target.value})}/>
            <TextField label={'Image URL'} variant={'outlined'} fullWidth margin={'dense'}
                       defaultValue={card.image} onChange={event => setCard({...card, image: event.target.value})}/>
            <TextField label={'Image size'} variant={'outlined'} fullWidth margin={'dense'}
                       defaultValue={card.imageSize}
                       onChange={event => setCard({...card, imageSize: event.target.value})}/>
            <FormControl fullWidth variant={'outlined'} margin={'dense'}>
              <InputLabel>Type</InputLabel>
              <Select label={'Type'}
                      defaultValue={card.type} onChange={event => setCard({...card, type: event.target.value})}>
                <MenuItem value={'ABILITY'}>Ability</MenuItem>
                <MenuItem value={'EQUIPMENT'}>Equipment</MenuItem>
                <MenuItem value={'PASSIVE_ABILITY'}>Passive Ability</MenuItem>
                <MenuItem value={'ITEM'}>Item</MenuItem>
              </Select>
            </FormControl>
            <TextField label={'Body'} multiline variant={'outlined'} rows={4} fullWidth margin={'dense'}
                       defaultValue={card.body} onChange={event => setCard({...card, body: event.target.value})}/>
            <TextField label={'Flavor'} multiline variant={'outlined'} rows={2} fullWidth margin={'dense'}
                       defaultValue={card.flavor} onChange={event => setCard({...card, flavor: event.target.value})}/>
          </Box>
        </Card>
      </Box>
    </div>;
};

export default CardPage;