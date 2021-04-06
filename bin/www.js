const app = require("../app");
const debug = require("debug")("Mirai:server");
const http = require("http");

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

module.exports = server.listen(port, () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
});
