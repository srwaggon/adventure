import useProficiencies from '../proficiency/useProficiencies';
import {Box, Card, CardContent, TextField, Typography} from '@material-ui/core';
import CharacterPortraitCard from './CharacterPortraitCard/CharacterPortraitCard';
import EditCharacterNameTextField from './CharacterPage/EditCharacterNameTextField';
import CharacterAttribute from './CharacterPage/CharacterAttribute/CharacterAttribute';
import CharacterResource from './CharacterPage/CharacterResource/CharacterResource';
import ProficiencyChip from './CharacterPage/ProficiencyChip';
import React from 'react';

const CharacterDetails = ({character, setCharacter, isEditing}) => {

  const proficiencies = useProficiencies();

  const characterPageState = {character, setCharacter, isEditing};

  return <Card className={'character-card'}>
    <CardContent>
      <Box display='flex' flexDirection='row-reverse' flexWrap='wrap' justifyContent='space-between'>
        <Box>
          <CharacterPortraitCard {...character}/>
          {isEditing && <Box py={1}>
            <TextField
              label='Portrait URL'
              variant='outlined'
              margin='dense'
              fullWidth
              defaultValue={character['portraitUrl']}
              onChange={event => setCharacter({...character, portraitUrl: event.target.value})}/>
          </Box>}
        </Box>
        <Box>
          <Box display='flex' flexGrow={3} p={1}>
            {isEditing
              ? <EditCharacterNameTextField character={character} setCharacter={setCharacter}/>
              : <Typography align='center' variant={'h3'}>{character.name}</Typography>}
          </Box>
          <Typography variant='h5'>Attributes</Typography>
          <Box display='flex' flexWrap='wrap' justifyContent='center'>
            <Box className="character-attributes-group" padding={1}>
              <CharacterAttribute {...characterPageState} attribute={'strength'}/>
              <CharacterAttribute {...characterPageState} attribute={'dexterity'}/>
              <CharacterAttribute {...characterPageState} attribute={'constitution'}/>
            </Box>
            <Box className="character-attributes-group" padding={1}>
              <CharacterAttribute {...characterPageState} attribute={'presence'}/>
              <CharacterAttribute {...characterPageState} attribute={'influence'}/>
              <CharacterAttribute {...characterPageState} attribute={'composure'}/>
            </Box>
            <Box className="character-attributes-group" padding={1}>
              <CharacterAttribute {...characterPageState} attribute={'intelligence'}/>
              <CharacterAttribute {...characterPageState} attribute={'wits'}/>
              <CharacterAttribute {...characterPageState} attribute={'resolve'}/>
            </Box>
          </Box>
          <Typography variant='h5'>Resources</Typography>
          <Box display='flex' flexWrap='wrap' justifyContent='center'>
            <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'stamina'}/></Box>
            <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'confidence'}/></Box>
            <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'focus'}/></Box>
          </Box>
          <Box display='flex' flexWrap='wrap' justifyContent='center'>
            <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'health'}/></Box>
            <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'reputation'}/></Box>
            <Box pr={'16px'}><CharacterResource {...characterPageState} resource={'mana'}/></Box>
          </Box>
        </Box>
      </Box>
      <Typography variant='h5'>Proficiencies</Typography>
      <Box display='flex' flexWrap='wrap' flexDirection={'row'}>
        {proficiencies.map(proficiency =>
          <ProficiencyChip {...characterPageState} proficiency={proficiency}/>)}
      </Box>
    </CardContent>
  </Card>;
};

export default CharacterDetails;