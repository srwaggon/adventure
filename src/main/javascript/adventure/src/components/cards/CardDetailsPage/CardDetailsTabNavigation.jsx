import {Box, Tab, Tabs, Typography, useTheme} from "@mui/material";
import React from "react";
import {CardDataForm} from "./CardDataForm";
import {CardAppearanceForm} from "./CardAppearanceForm";
import PrerequisitesForm from "./PrerequisitesForm";
import {CostsForm} from "./CostsForm";

export const CardDetailsTabNavigation = (props) => {

  const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{p: 1}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const {card, setCard, isEditing} = props;
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Box>
      <Tabs
        value={value}
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
        minHeight={516}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CardDataForm {...{card, setCard, isEditing}} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CardAppearanceForm {...{card, setCard}} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <PrerequisitesForm {...{card, setCard, isEditing}} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <CostsForm {...{card, setCard, isEditing}} />
        </TabPanel>
      </Box>
    </Box>
  );
}
