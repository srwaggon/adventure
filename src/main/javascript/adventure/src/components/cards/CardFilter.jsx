import {Box, MenuItem, TextField} from '@material-ui/core';
import CardTypeSelect from './CardTypeSelect';
import React, {useEffect, useState} from 'react';
import CardQualitySelect from './CardQualitySelect';
import CardEditionSelect from './CardEditionSelect';

const filterName = (name) => (card) => card.name.toLowerCase().includes(name);
const filterType = (type) => (card) => 'any' === type || type === card.type;
const filterQuality = (quality) => (card) => 'any' === quality || quality === card.quality;
const filterEdition = (editionId) => (card) => 'any' === editionId || editionId === card.editionId;

const CardFilter = ({setFilterFunc}) => {

  const [filter, setFilter] = useState({
    name: '',
    type: 'any',
    quality: 'any',
    editionId: 'any',
  });

  useEffect(() => {
    setFilterFunc(() => (cards) =>
      cards
        .filter(filterName(filter.name))
        .filter(filterType(filter.type))
        .filter(filterQuality(filter.quality))
        .filter(filterEdition(filter.editionId)),
    );
  }, [filter.name, filter.type, filter.quality, filter.editionId, setFilterFunc]);

  return <Box display={'flex'} flexGrow={2} flexShrink={1} justifyContent={'flex-end'} flexWrap={'wrap'}>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <TextField
        label='Name'
        variant='outlined'
        margin='dense'
        fullWidth
        defaultValue={filter.term}
        onChange={event => setFilter({...filter, name: event.target.value.toLowerCase()})}
      />
    </Box>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <CardTypeSelect
        defaultValue={'any'}
        onSelect={(type) => setFilter({...filter, type})}>
        <MenuItem value={'any'}>Any</MenuItem>
      </CardTypeSelect>
    </Box>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <CardQualitySelect
        defaultValue={'any'}
        onSelect={(quality) => setFilter({...filter, quality})}>
        <MenuItem value={'any'}>Any</MenuItem>
        <MenuItem value={null}>None</MenuItem>
      </CardQualitySelect>
    </Box>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <CardEditionSelect
        defaultValue={'any'}
        onSelect={(editionId) => setFilter({...filter, editionId})}>
        <MenuItem value={'any'}>Any</MenuItem>
        <MenuItem value={null}>None</MenuItem>
      </CardEditionSelect>
    </Box>

  </Box>;
};

export default CardFilter;
