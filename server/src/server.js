const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");
const PORT = config.dev.PORT;

app.listen(PORT, async () => {
  console.log(`Server is started at http://localhost:${PORT}`);
  await connectDB();
});
