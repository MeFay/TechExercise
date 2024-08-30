const cors_proxy = require('cors-anywhere');
const port = 8080;

cors_proxy.createServer({
  originWhitelist: [],
}).listen(port, '0.0.0.0', () => {
  console.log(`CORS Anywhere server running on port ${port}`);
});
