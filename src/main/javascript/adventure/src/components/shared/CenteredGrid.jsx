import {Grid} from '@material-ui/core';
import React from 'react';

const CenteredGrid = ({children}) => {
  return <Grid container justify={'center'} spacing={1}>
    {(Array.isArray(children) ? children : [children])
      .map(child => <Grid item>{child}</Grid>)}
  </Grid>;
};

export default CenteredGrid;