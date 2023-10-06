const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./secret");
app.listen(PORT, async () => {
  console.log(`Server is started at http://localhost:${PORT}`);
  await connectDB();
});
