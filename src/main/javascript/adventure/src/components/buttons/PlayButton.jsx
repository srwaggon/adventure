import {Box, IconButton} from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const PlayButton = ({disabled, onClick}) => {
  return <Box>
    <IconButton
      aria-label='play'
      color='default'
      disabled={disabled}
      onClick={onClick}>
      <PlayCircleFilledIcon/>
    </IconButton>
  </Box>;
};

export default PlayButton;