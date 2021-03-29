import {Box, MenuItem, TextField} from '@material-ui/core';
import CardTypeSelect from './CardTypeSelect/CardTypeSelect';
import React, {useEffect, useState} from 'react';

const filterName = (name) => (card) => card.name.toLowerCase().includes(name);
const filterType = (type) => (card) => 'any' === type || type === card.type;

const CardFilter = ({setFilterFunc}) => {

  const [filter, setFilter] = useState({name: '', type: 'any'});

  useEffect(() => {
    const wholeFilter = (cards) =>
      cards
        .filter(filterName(filter.name))
        .filter(filterType(filter.type));
    setFilterFunc(() => wholeFilter);
  }, [filter.name, filter.type, setFilterFunc]);

  return <Box display={'flex'} flexGrow={2} flexShrink={0}
              justifyContent={'flex-end'} flexWrap={'wrap'}>
    <Box flexGrow={1} flexShrink={0}>
      <CardTypeSelect
        defaultValue={'any'}
        onSelectType={(type) => setFilter({...filter, type})}>
        <MenuItem value={'any'}>Any</MenuItem>
      </CardTypeSelect>
    </Box>
    <Box flexGrow={1} flexShrink={0} pl={1}>
      <TextField
        label='Filter by name'
        variant='outlined'
        margin='dense'
        fullWidth
        defaultValue={filter.term}
        onChange={event => setFilter({...filter, name: event.target.value.toLowerCase()})}
      />
    </Box>
  </Box>;
};

export default CardFilter;