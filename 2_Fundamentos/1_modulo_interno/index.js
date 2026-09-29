const meuModulo = require('./meu_modulo')
const soma = meuModulo.soma

soma(2, 3)
soma(5, 7)
soma(10, 15)

// utilizando exemplo do chalk para exibir mensagens coloridas no console
const chalk = require('chalk');

// Texto verde
console.log(chalk.green('Sucesso: Operação concluída!'));

// Texto vermelho e em negrito
console.log(chalk.red.bold('Erro: Não foi possível conectar ao banco de dados.'));

// Fundo azul com texto branco
console.log(chalk.bgBlue.white(' INFORMAÇÃO '));
