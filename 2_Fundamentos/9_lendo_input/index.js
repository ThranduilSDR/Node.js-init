const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('Qual é a sua linguagem de programação favorita? ', (language) => {
    if (language === "Python") {
        console.log(`Isso nem é linguagem, mas tudo bem!`)
    } else {     
        console.log(`A minha linguagem favorita é: ${language}`)
    }

    readline.close()
})