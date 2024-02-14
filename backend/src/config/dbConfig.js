const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbConfig = `mongodb+srv://${dbUser}:${dbPass}@cluster0.sxejjry.mongodb.net/?retryWrites=true&w=majority`
const connect = mongoose.connect(dbConfig).then(() => {
    console.log('Conectou ao banco de dados')
}).catch((err) => {
    console.log('Não conectou ao banco de dados ' + err)
})

module.exports = connect