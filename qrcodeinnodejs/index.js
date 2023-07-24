const QrCode = require('qrcode');
const express = require("express");
const path = require("path");
const app = express();
//qr code generate in console.log
QrCode.toString('https://www.google.com/', (err, data) => {
    if (err) throw err;
    console.log(data);
})

//make uniqur qr code 
QrCode.toFile(path.join(__dirname, 'qrcode.png'), "https://www.google.com/", (err, data) => {
    if (err) throw err;

})
app.listen(3000, () => {
    console.log("application listening.....");
});