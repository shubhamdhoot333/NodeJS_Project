const fs = require("fs");
const path = require("path");
const prompt = require('prompt-sync')();

var diPath = path.join(__dirname, "crud");
console.log("1 for create file , 2 for readfile 3 for append file 4 for rename file  5 to delete file ")
const number = prompt('please enter number ?');
switch (number) {
    case "1":
        var filename = prompt('please enter filename  ?');
        create(filename);
        break;
    case "2":
        var filename = prompt('please enter filename to read  ?');
        readFile(filename);
        break;
    case "3":
        var filename = prompt('please enter filename for append ?');
        appendFile(filename);
        break;
    case "4":
        var filename = prompt('please enter old filename to rename  ?');
        filerename(filename);
        break;
    case "5":
        var filename = prompt('please enter filename to delete  ?');
        deleteFile(filename);
        break;

    default:
        console.log("please enter valied number to work on file system ")
}
//created file 
function create(name) {
    const filename = `${diPath}/` + name + `.txt`;
    fs.writeFileSync(filename, "you can start now");
    console.log("file created");
}
//read file
function readFile(name) {
    const filename = `${diPath}/` + name + `.txt`;
    fs.readFile(filename, 'utf8', (err, textdata) => {
        console.log(textdata);
    }
    )
}
//append file 
function appendFile(name) {
    const filename = `${diPath}/` + name + `.txt`;
    fs.appendFile(filename, " and this is apple data", (err) => {
        if (!err) console.log("file is updated ");
    });
}
//rename file 
function filerename(name) {
    const filename = `${diPath}/` + name + `.txt`;
    var newfilename = prompt('please enter new filename   ?');
    fs.rename(filename, `${diPath}/` + newfilename + `.txt`, (err) => {
        if (!err) console.log("file name is updated ")
    })
}
//delete file 
function deleteFile(name) {
    fs.unlinkSync(`${diPath}/${name}.txt`);
}