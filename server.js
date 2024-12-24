const express = require('express');

const app = express();

app.use(express.static('./dist'))

//运行端口
const port = 80;

app.listen(port, function (error) {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Listening at http://localhost" + port + "\n");
});