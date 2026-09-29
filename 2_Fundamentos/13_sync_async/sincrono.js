const fs = require (`fs`) // file system

console.log('Inicio do programa')

fs.writeFileSync(`arquivo.txt`, `Texto de teste`)

console.log('Fim do programa')  