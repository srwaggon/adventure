import {Card, Typography} from '@material-ui/core';
import React from 'react';

const CharacterPortrait = ({name}) => <Card className={'character-panel'}>
  <img className={'character-selection-panel-image'}
       alt={'character portrait'}
       src={'https://cdn.discordapp.com/attachments/823412384311279666/823443211988107264/Travin_the_Human.jpeg'}/>
  <Typography className={'character-selection-panel-name'} variant="h6">
    {name}
  </Typography>
</Card>;

export default CharacterPortrait;