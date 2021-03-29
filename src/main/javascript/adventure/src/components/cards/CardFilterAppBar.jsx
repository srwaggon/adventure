import React from 'react';

import {AppBar, Box, Toolbar, Typography} from '@material-ui/core';

const CardFilterAppBar = ({children, title}) =>
  <AppBar color='default' position='static'>
    <Toolbar>
      <Box display={'flex'} flexDirection={'row'} width={'100%'} alignItems={'center'} flexWrap={'wrap'}>
        <Box flexGrow={1} flexShrink={0}>
          <Typography variant='h6'>{title}</Typography>
        </Box>
        {children}
      </Box>
    </Toolbar>
  </AppBar>;

export default CardFilterAppBar;