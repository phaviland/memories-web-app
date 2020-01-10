const express = require('express');
var path = require("path");
const app = express();

app.listen(3001);
app.use('/static/', express.static(__dirname)); 
app.get("/*", function(req, res, next) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
