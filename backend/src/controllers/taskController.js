const taskModel = require('../models/userModel')

module.exports = {

    async create(req, res) {
        const { title, content } = req.body
        if (!title || !content) {
            res.status(401).json({ msg: 'Faltando título ou conteúdo' })
        } else {
            const task = await taskModel.create({
                title,
                content
            })
            res.status(201).json({ msg: 'Criado com sucesso' })
        }
    },
    async read(req, res) {
        const allTasks = await taskModel.find()
        res.status(200).json(allTasks)
    },

    async update(req, res) {
        const { title, content } = req.body
        const id = req.params.id
        const task = await taskModel.findOne({ _id: id })
        if (!task || !id) {
            res.status(401).json({ msg: 'Erro' })
        } else {
            task.title = title
            task.content = content
            task.save()
            res.status(200).json({ msg: 'Alterado com sucesso', task })
        }

    },
    async delete(req, res) {
        const id = req.params.id
        const userExists = await taskModel.findOne({ _id: id })
        if (!id) {
            res.status(401).json({ msg: 'Erro' })
        } else if (!userExists) {
            res.status(401).json({ msg: 'Erro, Tarefa não existe, ou já foi excluída' })
        } else {
            try {
                const task = await taskModel.findOneAndDelete({ _id: id })
                res.status(200).json({ msg: 'Excluído com sucesso', task })
            } catch (err) {
                res.status(401).json({ msg: 'Erro ao deletar' })
            }

        }
    }

}