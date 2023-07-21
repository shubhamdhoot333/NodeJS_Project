
//empty pdf code 
//https://www.brcline.com/blog/generating-pdf-in-nodejs
//using pdfkit 
const PDFGenerator = require('pdfkit')
const fs = require('fs')

// instantiate the library
let theOutput = new PDFGenerator

// pipe to a writable stream which would save the result into the same directory
theOutput.pipe(fs.createWriteStream('TestDocument.pdf'))
theOutput.text('Some awesome example text')

// write out file
theOutput.end()