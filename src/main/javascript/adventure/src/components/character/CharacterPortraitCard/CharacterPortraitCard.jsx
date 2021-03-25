import './CharacterPortraitCard.css';

import {Card, Typography} from '@material-ui/core';
import React from 'react';

const CharacterPortraitCard = ({name, portraitUrl}) =>
  <Card className={'character-portrait-card'}>
    <img className={'character-portrait-image'}
         style={{marginLeft: '50%', transform: 'translateX(-50%)'}}
         alt={'character portrait'}
         src={portraitUrl
         || 'https://cdn.discordapp.com/attachments/823412384311279666/823443211988107264/Travin_the_Human.jpeg'}/>
    <Typography variant="h6">{name}</Typography>
  </Card>;

export default CharacterPortraitCard;