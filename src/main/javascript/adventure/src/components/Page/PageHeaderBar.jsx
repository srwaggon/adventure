import {AppBar, Toolbar, Typography} from '@material-ui/core';
import EditButtonRow from '../buttons/EditButtonRow/EditButtonRow';
import React from 'react';

export const PageHeaderBar = ({title, isEditing, onEdit, onCancelEdit, onSave, onDelete}) =>
  <AppBar color='default' position='static'>
    <Toolbar>
      <Typography variant='h6' style={{flexGrow: 1}}>{title}</Typography>
      <EditButtonRow {...{isEditing, onEdit, onCancelEdit, onSave, onDelete}} />
    </Toolbar>
  </AppBar>;

export default PageHeaderBar;