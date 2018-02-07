const http = require('http');
const path = require('path');
const express = require('express');

const router = express();
const server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));


server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  const addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
