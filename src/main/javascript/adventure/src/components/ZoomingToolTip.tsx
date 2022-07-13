import Tooltip from "@mui/material/Tooltip";
import React, {ReactElement} from "react";
import {Scaled} from "./Scaled";

type Props = {
  children: ReactElement,
  scale?: number
};

export const ZoomingToolTip = (props: Props): ReactElement => {
  const {children, scale = 1.5} = props;
  return (
    <div className={"super-necessary-div-else-the-tooltipable-area-is-oversized"}>
      <Tooltip followCursor title={
        <Scaled scale={scale}>
          {children}
        </Scaled>
      }>
        <div className={"super-necessary-div-else-the-tooltip-doesnt-appear"}>
          {children}
        </div>
      </Tooltip>
    </div>
  );
};
