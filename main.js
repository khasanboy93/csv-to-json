const fs = require("fs");
booksCsv = fs.readFileSync("books.csv");


const csvToJson = (csvFile) => {

    const rows = csvFile.toString().split('\n');    
    const keys = rows[0].toLowerCase().split(",");
    
    let result = [];
    rows.shift();
    rows.map(row => {
        let object = {};
        let tempStringRow = '';
        let quoteFlag = 0;
        for (let char of row) {
            if (char === '"' && quoteFlag === 0) {
                quoteFlag = 1;
            } else if (char === '"' && quoteFlag === 1) {
                quoteFlag = 0;
            }
            if (char === ',' && quoteFlag === 0) {
                char = '|'
            }
            if (char !== '"') {
                tempStringRow += char;
            }
        }
        const values = tempStringRow.split('|');
        keys.map((key, index) => {
            object[key] = values[index];
        })
        result.push(object);
    })
    return result;
}

fs.writeFile("output-books.json", JSON.stringify(csvToJson(booksCsv)), (err) => {
    if (err) {
        console.log(err);
    }
});