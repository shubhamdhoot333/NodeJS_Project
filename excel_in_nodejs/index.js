const XLSX = require('xlsx');
const data = [
    { name: 'Diary', code: 'diary_code', author: 'Pagorn' },
    { name: 'Note', code: 'note_code', author: 'Pagorn' },
    { name: 'Medium', code: 'medium_code', author: 'Pagorn' },
]
const workSheet = XLSX.utils.json_to_sheet(data);
const workBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
XLSX.writeFile(workBook, "sample.xlsx");