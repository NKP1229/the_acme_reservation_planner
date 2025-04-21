const { client } = require("./common");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(require("morgan")("dev"));
const cors = require("cors");

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "This works" });
});

const init = async () => {
  await client.connect();
};
init();
