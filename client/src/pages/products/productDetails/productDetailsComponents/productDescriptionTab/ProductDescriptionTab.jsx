import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdditionalInformation from "./AdditionalInformation";
import Specification from "./Specification";
import Review from "./Review";
import { useState } from "react";
import Description from "./Description";

const ProductDescriptionTab = () => {
  
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ width: "100%", typography: "body1", border: "1px solid #B4B4B4" }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example scrollable"
            centered
          >
            <Tab label="DESCRIPTION" value="1" />
            <Tab label="ADDITIONAL INFORMATION" value="2" />
            <Tab label="SPECIFICATION" value="3" />
            <Tab label="REVIEW" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Description />
        </TabPanel>
        <TabPanel value="2">
          <AdditionalInformation />
        </TabPanel>
        <TabPanel value="3">
          <Specification />
        </TabPanel>
        <TabPanel value="4">
          <Review />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProductDescriptionTab;
