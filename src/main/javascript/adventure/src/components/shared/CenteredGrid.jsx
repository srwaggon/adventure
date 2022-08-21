import {Grid} from "@mui/material";
import React from "react";

const CenteredGrid = ({children}) => {
  const items = Array.isArray(children) ? children : [children];
  const gridItem = child => <Grid key={Math.random()} item>{child}</Grid>;
  return (
    <Grid container justifyContent={"center"} spacing={1}>
      {items.map(gridItem)}
    </Grid>
  );
};

export default CenteredGrid;
