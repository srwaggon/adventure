import React from "react";

import {Box} from "@mui/material";

type RowProps = any
const Row = ({children, ...props}: RowProps) =>
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="spaceBetween" {...props}>
    {children}
  </Box>;

export default Row;
