const authModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports = {

    async register(req, res) {
        const { name, email, password } = req.body
        const userExists = await authModel.findOne({ email: email })
        if (!name || !email || !password) {
            res.status(401).json({ msg: 'Está faltando dados' })
        } else if (!email.includes('@')) {
            res.status(400).json({ msg: 'Coloque um email válido' })
        } else if (userExists) {
            res.status(400).json({ msg: 'Esta conta já existe' })
        } else {
            try {
                const user = await authModel.create({
                    name,
                    email,
                    password
                })
                res.status(201).json({ msg: 'Usuario criado com sucesso' })
            } catch (err) {
                res.status(400).json({ msg: 'Erro ' + err })
            }
        }

    },

    async login(req, res) {
        const { email, password } = req.body
        const user = await authModel.findOne({
            email: email,
            password: password
        })
        const secret = process.env.SECRET
        if (!email || !password) {
            res.status(401).json({ msg: "Está faltando dados" })
        } else if (!user) {
            res.status(401).json({ msg: 'Esta conta não existe' })
        } else {
            try {
                const token = jwt.sign({
                    id: user._id,
                }, secret)

                res.status(200).json({ msg: 'Logado com sucesso', token, id: user._id })
            } catch (err) {
                res.status(401).json({ msg: 'Erro ao criar token' })
            }
        }
    },

    checkToken(req, res, next) {
        const token = req.headers['x-access-token']
        const secret = process.env.SECRET
        if (!token) {
            res.status(401).json({ msg: 'acesso negado' })
        } else {
            try {
                jwt.verify(token, secret)
                next()
            } catch (err) {
                res.status(401).json({ msg: 'Token inválido' })
            }
        }
    },

    async logged(req, res) {
        const id = req.params.id
        const user = await authModel.findOne({ _id: id }, '-password')
        if (!user) {
            res.status(401).json({ msg: 'Acesso negado' })
        } else {
            res.status(200).json(user)
        }
    }





}