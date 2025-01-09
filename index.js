const app = require("./app");
require("dotenv").config();
app.listen(5000, function () {
  console.log("App run @5000")
})