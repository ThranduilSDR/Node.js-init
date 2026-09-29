

//módulo externo
const minimist = require('minimist')

//módulo interno
const some = require('./soma').soma

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])

some(a, b)