import {Box, MenuItem, TextField} from '@material-ui/core';
import CardTypeSelect from './CardTypeSelect/CardTypeSelect';
import React, {useEffect, useState} from 'react';
import CardQualitySelect from './CardQualitySelect';

const filterName = (name) => (card) => card.name.toLowerCase().includes(name);
const filterType = (type) => (card) => 'any' === type || type === card.type;
const filterQuality = (quality) => (card) => 'any' === quality || quality === card.quality;

const CardFilter = ({setFilterFunc}) => {

  const [filter, setFilter] = useState({
    name: '',
    type: 'any',
    quality: 'any',
  });

  useEffect(() => {
    setFilterFunc(() => (cards) =>
      cards
        .filter(filterName(filter.name))
        .filter(filterType(filter.type))
        .filter(filterQuality(filter.quality)),
    );
  }, [filter.name, filter.type, filter.quality, setFilterFunc]);

  return <Box display={'flex'} flexGrow={2} flexShrink={0} justifyContent={'flex-end'} flexWrap={'wrap'}>

    <Box flexGrow={1} flexShrink={0} pl={1}>
      <TextField
        label='Name'
        variant='outlined'
        margin='dense'
        fullWidth
        defaultValue={filter.term}
        onChange={event => setFilter({...filter, name: event.target.value.toLowerCase()})}
      />
    </Box>

    <Box flexGrow={1} flexShrink={0} pl={1}>
      <CardTypeSelect
        defaultValue={'any'}
        onSelect={(type) => setFilter({...filter, type})}>
        <MenuItem value={'any'}>Any</MenuItem>
      </CardTypeSelect>
    </Box>

    <Box flexGrow={1} flexShrink={0} pl={1}>
      <CardQualitySelect
        defaultValue={'any'}
        onSelect={(quality) => setFilter({...filter, quality})}>
        <MenuItem value={'any'}>Any</MenuItem>
        <MenuItem value={null}>None</MenuItem>
      </CardQualitySelect>
    </Box>

  </Box>;
};

export default CardFilter;