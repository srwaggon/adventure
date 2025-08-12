import {Box} from "@mui/material";
import React from "react";

type RowProps = any
export const Row = ({children, className, ...props}: RowProps) =>
  <Box
    className={`row ${className}`.trim()}
    display="flex"
    flexDirection="row"
    alignItems={"center"}
    justifyContent="space-between"
    width={"100%"}
    {...props}
  >
    {children}
  </Box>;
