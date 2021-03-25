import {Box, Card, FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import SpecialCard from '../specialcard/SpecialCard';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {
  deleteCard,
  getCardById,
  getCardTypes,
  getCurrentPlayer,
  postNewCard,
  replaceCard,
} from '../../../utilities/client';
import {prettifyCardType} from '../../../utilities/kitchen_sink';
import PageHeaderBar from '../../Page/PageHeaderBar';

const newCard = () => ({
  name: undefined,
  image: 'https://cdn.discordapp.com/attachments/783098091603361842/824651378960891904/unknown.png',
  imageSize: '100%',
  type: 'ABILITY',
  body: undefined,
  flavor: undefined,
});

const CardTypeSelect = ({card, setCard}) => {
  const [cardTypes, setCardTypes] = useState([]);
  useEffect(() => {
    getCardTypes()
      .then(response => response.json())
      .then(json => setCardTypes(json));
  }, []);

  return <FormControl fullWidth variant={'outlined'} margin={'dense'}>
    <InputLabel>Type</InputLabel>
    <Select label={'Type'} defaultValue={card.type} onChange={event => setCard({...card, type: event.target.value})}>
      {cardTypes.map(cardType => <MenuItem value={cardType}>{prettifyCardType(cardType)}</MenuItem>)}
    </Select>
  </FormControl>;
};

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
      setEditing(false);
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
      <PageHeaderBar {...{title: 'Card Details', isEditing, onEdit, onCancelEdit, onSave, onDelete}} />
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
            <CardTypeSelect {...{card, setCard}} />
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