import {Card, CardContent} from '@material-ui/core';
import TitledAppBar from './TitledAppBar';
import React from 'react';
import CenteredGrid from './CenteredGrid';

const CenteredGridWithAppBar = ({title, menuItems, children}) =>
  <Card>
    <TitledAppBar title={title}>
      {menuItems}
    </TitledAppBar>
    <CardContent>
      <CenteredGrid>
        {children}
      </CenteredGrid>
    </CardContent>
  </Card>;

export default CenteredGridWithAppBar;