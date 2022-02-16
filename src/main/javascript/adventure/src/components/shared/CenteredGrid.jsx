import {Grid} from "@mui/material";
import React from "react";

const CenteredGrid = ({children}) => {
  return (
    <Grid container justifyContent={"center"} spacing={1}>
      {(Array.isArray(children) ? children : [children])
        .map(child => <Grid item>{child}</Grid>)}
    </Grid>
  );
};

export default CenteredGrid;
