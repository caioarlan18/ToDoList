const express = require('express')
const routes = express.Router()
const authController = require('./controllers/authController')
const taskController = require('./controllers/taskController')
// rotas autenticação
routes.post('/register', authController.register)
routes.post('/login', authController.login)
routes.get('/logged/:id', authController.checkToken, authController.logged) //private route

// rotas to do list
routes.post('/createtask/:id', taskController.create)
routes.get('/alltasks/:id', taskController.read)
routes.post('/updatetask/:id/:taskid', taskController.update)
routes.delete('/deletetask/:id/:taskid', taskController.delete)


module.exports = routes