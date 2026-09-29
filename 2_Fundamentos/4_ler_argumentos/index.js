// nome

console.log(process.argv)

const args = process.argv.slice(2) 

console.log(args)

const nome = args[0].split('=')[1]

console.log(nome)

const idade = args[1].split('=')[1]

console.log(idade)

console.log(`Olá ${nome}, você tem ${idade} anos.`)