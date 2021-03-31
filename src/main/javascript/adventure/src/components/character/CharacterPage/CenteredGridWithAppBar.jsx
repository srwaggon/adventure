import {Card, CardContent} from '@material-ui/core';
import TitledAppBar from '../../shared/TitledAppBar';
import React from 'react';
import CenteredGrid from '../../shared/CenteredGrid';

const CenteredGridWithAppBar = ({children, title, items}) =>
  <Card>
    <TitledAppBar title={title}>
      {children}
    </TitledAppBar>
    <CardContent>
      <CenteredGrid>
        {items}
      </CenteredGrid>
    </CardContent>
  </Card>;

export default CenteredGridWithAppBar;