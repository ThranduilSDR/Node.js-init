const path = require("path")

const customPath = "/relatorio/2024/junho/relatorio.pdf"

console.log(path.dirname(customPath)) // /relatorio/2024/junho
console.log(path.basename(customPath)) // relatorio.pdf
console.log(path.extname(customPath)) // .pdf
