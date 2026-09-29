const chalk = require('chalk')

const nota = 7

if(nota >= 7) {
console.log(chalk.green.bold(`Parabéns! Você está aprovado! Sua nota foi ${nota}.`))
} else {
console.log(chalk.bgRed.bold(`Infelizmente, você não foi aprovado. Sua nota foi ${nota}.`))
}
