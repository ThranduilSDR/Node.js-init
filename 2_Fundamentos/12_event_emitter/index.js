const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

eventEmitter.on('start', () => {
    console.log('Durante o evento start')
})

console.log('Antes do evento start')
eventEmitter.emit('start')
console.log('Depois do evento start')
