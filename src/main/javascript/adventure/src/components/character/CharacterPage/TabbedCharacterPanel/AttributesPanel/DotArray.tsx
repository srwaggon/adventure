import {IconButton} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import React from "react";

export const DotArray = (props: any) => {
  const {name, value} = props;
  const dottedDots = Math.max(5, value);
  const oneEach: any = Array(dottedDots).keys();
  return <>
    {[...oneEach]
      .map((int) =>
        <IconButton
          key={`dot-${name}-${int}`}
          color={"default"}
          size={"small"}
          style={{margin: "-2px", padding: 0}}
        >
          {int < value
            ? <FiberManualRecordIcon/>
            : <FiberManualRecordOutlinedIcon/>}
        </IconButton>
      )}
  </>;
};
