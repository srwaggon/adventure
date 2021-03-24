import {IconButton} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const CancelButton = ({onClick}) => {
  return <IconButton
    aria-label={'cancel'}
    color={'default'}
    onClick={onClick}>
    <CancelIcon/>
  </IconButton>;
};

export default CancelButton;