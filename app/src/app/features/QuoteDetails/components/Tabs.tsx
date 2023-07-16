'use client'

import theme from "@/app/core/theme";
import { Box, ButtonBaseTypeMap, ExtendButtonBase, Tabs as MuiTabs, Paper, Tab, TabsTypeMap, Typography, useMediaQuery } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useState } from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CallIcon from '@mui/icons-material/Call';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import QuoteForm from "./QuoteForm";
import TabPanel from "./TabPanel";

type TMuiTabProps = OverridableComponent<TabsTypeMap<{}, ExtendButtonBase<ButtonBaseTypeMap<{}, "button">>>>

const tabScrollableProps: Partial<TMuiTabProps> = {
    variant: 'scrollable',
    scrollButtons: 'auto',
    allowScrollButtonsMobile: true
}

const centeredTabsProps: Partial<TMuiTabProps> = {
    centered: true,
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      sx: {
        fontSize: '1.2rem'
      }
    };
}

const Tabs = () => {
    const isMediaQueryAboveSm = useMediaQuery(theme.breakpoints.up('sm'))
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <MuiTabs value={value} onChange={handleChange} {...(isMediaQueryAboveSm ? centeredTabsProps : tabScrollableProps)}>
            <Tab icon={<AssignmentIcon />} label="Quote" {...a11yProps(0)} />
            <Tab icon={<CallIcon />} label="Contact" {...a11yProps(1)} />
            <Tab icon={<FlightTakeoffIcon />} label="Airport" {...a11yProps(2)} />
          </MuiTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <QuoteForm  />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Paper>
    );
}

export default Tabs