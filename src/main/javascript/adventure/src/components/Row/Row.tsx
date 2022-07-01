import {Box} from "@mui/material";
import React from "react";

type RowProps = any
export const Row = ({children, ...props}: RowProps) =>
  <Box
    className={"row"}
    display="flex"
    flexDirection="row"
    alignItems={"center"}
    justifyContent="space-between"
    width={"100%"}
    {...props}
  >
    {children}
  </Box>;

