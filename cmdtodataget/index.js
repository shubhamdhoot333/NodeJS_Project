const fs =require("fs");
console.log("command line system to file created in nodejs");

var filename = process.argv[2];
var filedata = process.argv[3];
fs.writeFileSync(filename,filedata);
console.log(`your file `+filename+` created`+`data is inserted`);