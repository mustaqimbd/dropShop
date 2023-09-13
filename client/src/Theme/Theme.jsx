import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: "#83B735", // Custom primary color for header and buttons
    },
    secondary: {
      main: "#FA8232", // Custom secondary color for specific elements
    },
    error: {
      main: red.A400,
    },
    customColors: {
      ratingIcon: "#FA8232", // Rating icon color
      ratingCount: "#77878F", // Rating counter color
      offBadge: "#2DB224",   // Product Price, % off badge color
      hotBadge: "#EE5858",   // Hot offer badge color
      priceBadge: "#2DA5F3", // Price badge color
      iconBg: "#F2F4F5",     // Category icon background color
      productText: "#2DB224",   // Product text color
      heading: "#191C1F",       // Heading, category name, product title color
      caption: "#475156",       // Caption, subtitle, description color
      linkText: "#5F6C72",     // Full menu, every link text color
      footerLinkText: "#929FA5", // Footer page link text color
      deepGray: "#77878F",     // Full top bar, rating counter color
    },
  },
});

export default theme;
