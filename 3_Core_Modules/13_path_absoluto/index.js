const path = require("path")

//exemplo path absoluto
console.log(path.resolve("arquivo.txt")) //C:\Users\Emanuel Vitor\Documents\Dev\Curso Node JS\3_Core_Modules\13_path_absoluto\arquivo.txt

//formar path
const midFolder = "relatorio"
const fileName = "relatorio_node.pdf"

const finalPath = path.join("/", `arquivos`, midFolder, fileName)
console.log(finalPath) // /relatorio/relatorio.pdf
