import {Box, CardContent} from "@mui/material";
import TitledAppBar from "./TitledAppBar";
import React from "react";
import CenteredGrid from "./CenteredGrid";

const CenteredGridWithAppBar = ({title, menuItems, children}) =>
  <Box>
    <TitledAppBar title={title}>
      {menuItems}
    </TitledAppBar>
    <CardContent>
      <CenteredGrid>
        {children}
      </CenteredGrid>
    </CardContent>
  </Box>;

export default CenteredGridWithAppBar;
