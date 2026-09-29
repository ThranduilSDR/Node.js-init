const fs = require (`fs`) // file system

console.log('Inicio do programa')

fs.writeFile (`arquivo.txt`, "Texto de teste", function (err) {
    setTimeout(function() {
        console.log('Arquivo Criado')
    }, 1000)
})

console.log('Fim do programa')