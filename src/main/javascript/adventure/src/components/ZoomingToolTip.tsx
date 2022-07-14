import Tooltip from "@mui/material/Tooltip";
import React, {ReactNode} from "react";
import {Scaled} from "./Scaled";

type Props = {
  children: ReactNode,
  scale?: number
};

export const ZoomingToolTip = (props: Props) => {
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
