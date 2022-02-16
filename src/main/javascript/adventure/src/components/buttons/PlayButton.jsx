import {Box, IconButton} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

const PlayButton = ({disabled, onClick}) => {
  return (
    <Box>
      <IconButton
        aria-label="play"
        color="default"
        disabled={disabled}
        onClick={onClick}
        size="large">
        <PlayCircleFilledIcon/>
      </IconButton>
    </Box>
  );
};

export default PlayButton;
