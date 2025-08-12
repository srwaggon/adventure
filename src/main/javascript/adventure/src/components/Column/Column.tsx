import {Box} from "@mui/material";
import React from "react";

type ColumnProps = {
  children: any,
  className: string,
  alignItems: "left" | "center",
}
export const Column = ({children, className, alignItems = "center", ...props}: ColumnProps) =>
  <Box
    className={`column ${className}`.trim()}
    display="flex"
    flexDirection="column"
    alignItems={alignItems}
    justifyContent="space-between"
    width={"100%"}
    {...props}
  >
    {children}
  </Box>;
