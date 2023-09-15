/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#83B735",   // Custom primary color for Primary, header, button
        orange: "#FA8232",    // Custom orange color
        ratingIcon: "#FA8232", // Rating icon color
        ratingCount: "#77878F", // Rating counter color
        offBadge: "#2DB224",   // Product Price, % off badge color
        hotBadge: "#EE5858",   // Hot offer badge color
<<<<<<< HEAD
        priceBadge: "#2DA5F3", // Price badge color
        iconBg: "#F2F4F5",     // Category icon background color
        productText: "#2DB224",    // Product text color
        heading: "#191C1F",        // Heading, category name, product title color
        caption: "#475156",        // Caption, subtitle, description color
        linkText: "#5F6C72",       // Full menu, every link text color
=======
        priceBadge: "#2DA5F3", // Price badge color 
        iconBg: "#F2F4F5",     // Category icon background color #34495e;
        productText: "#2DB224",   // Product text color
        heading: "#191C1F",       // Heading, category name, product title color
        caption: "#475156",       // Caption, subtitle, description color
        linkText: "#5F6C72",     // Full menu, every link text color
>>>>>>> 520964dc6f9426c8232816896c8164a1cbba187d
        footerLinkText: "#929FA5", // Footer page link text color
        deepGray: "#77878F",  
        borderColor:"#E4E7E9",
        discountbtn:"#34495e" ,
        smarphone :"#EBC80C" // Full top bar, rating counter color
      },
      fontFamily:{
        "sans" : ['Public Sans', 'sans-serif']
      }
    },
   
   
  },
  plugins: [],
}