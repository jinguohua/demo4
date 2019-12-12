if (process.env.NODE_ENV === "development") {
  module.exports = require("./config/webpackconfig");
  console.error(__dirname, "process.env.NODE_ENV");
} else {
  module.exports = require("./config/webpackconfig");
}
