import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const AddToCartProductDescription = () => {
    const [value, setValue] = React.useState("1")
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example scrollable" centered >
                        <Tab label="DESCRIPTION" value="1" />
                        <Tab label="ADDITIONAL INFORMATION" value="2" />
                        <Tab label="SPECIFICATION" value="3" />
                        <Tab label="REVIEW" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">DESCRIPTION</TabPanel>
                <TabPanel value="2">ADDITIONAL INFORMATION</TabPanel>
                <TabPanel value="3">SPECIFICATION</TabPanel>
                <TabPanel value="4">REVIEW</TabPanel>
            </TabContext>
        </Box>
    )
}

export default AddToCartProductDescription
