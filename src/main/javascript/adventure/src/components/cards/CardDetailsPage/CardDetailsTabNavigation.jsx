import {Box, Card, Tab, Tabs, Typography, useTheme} from "@mui/material";
import React from "react";
import {CardDataForm} from "./CardDataForm";
import {CardAppearanceForm} from "./CardAppearanceForm";
import PrerequisitesForm from "./PrerequisitesForm";
import {CostsForm} from "./CostsForm";

export const CardDetailsTabNavigation = () => {

  const theme = useTheme();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  return (
    <Card>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant={"scrollable"}
        scrollButtons={"auto"}
      >
        <Tab label="Data"/>
        <Tab label="Appearance"/>
        <Tab label="Prerequisites"/>
        <Tab label="Costs"/>
      </Tabs>

      <Box
        p={1}
        minHeight={420}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabIndex} index={0}><CardDataForm/></TabPanel>
        <TabPanel value={tabIndex} index={1}><CardAppearanceForm/></TabPanel>
        <TabPanel value={tabIndex} index={2}><PrerequisitesForm/></TabPanel>
        <TabPanel value={tabIndex} index={3}><CostsForm/></TabPanel>
      </Box>
    </Card>
  );
}

const TabPanel = (props) => {
  const {children, value, index, ...other} = props;

  return <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{p: 1}}>
      <Typography>{children}</Typography>
    </Box>}
  </div>;
};
