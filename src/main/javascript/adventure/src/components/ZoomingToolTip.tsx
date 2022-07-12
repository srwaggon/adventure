import {Box} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React, {ReactElement} from "react";

type Props = {
  children: ReactElement,
  scale?: number
};

export const ZoomingToolTip = (props: Props): ReactElement => {
  const {children, scale = 1.5} = props;
  return (
    <div className={"super-necessary-div-else-the-tooltipable-area-is-oversized"}>
      <Tooltip followCursor arrow title={
        <Box sx={{
          transform: `scale(${scale})`,
          maxWidth: "none",
          fontWeight: "normal",
        }}>
          {children}
        </Box>
      }>
        <div className={"super-necessary-div-else-the-tooltip-doesnt-appear"}>
          {children}
        </div>
      </Tooltip>
    </div>
  );
};
