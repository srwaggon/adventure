import {Box, IconButton} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyButton = ({disabled, onClick}) => {
    return (
        <Box>
            <IconButton
                aria-label={"save"}
                color={"primary"}
                disabled={disabled}
                onClick={onClick}
                size="large">
                <ContentCopyIcon/>
            </IconButton>
        </Box>
    );
};

export default CopyButton;
