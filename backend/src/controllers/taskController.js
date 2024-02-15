const taskModel = require('../models/userModel')

module.exports = {

    async create(req, res) {
        const id = req.params.id
        const { title, content } = req.body
        const task = await taskModel.findOne({
            _id: id
        })
        if (!title || !content) {
            res.status(401).json({ msg: 'Faltando título ou conteúdo' })
        } else if (!task || !id) {
            res.status(400).json({ msg: 'Acesso negado' })
        } else {
            task.notes.push({ title, content })
            await task.save()
            res.status(201).json({ msg: 'Criado com sucesso' })
        }
    },
    async read(req, res) {
        const id = req.params.id
        const allTasks = await taskModel.findOne({ _id: id })
        res.status(200).json(allTasks.notes)
    },

    async update(req, res) {
        const { Newtitle, Newcontent } = req.body
        const id = req.params.id
        const taskId = req.params.taskid
        const userdata = await taskModel.findOne({ _id: id })
        const task = userdata.notes.id(taskId)
        if (!task || !id) {
            res.status(401).json({ msg: 'Erro' })
        } else {
            if (Newtitle) {
                task.title = Newtitle
                await userdata.save()
            }
            if (Newcontent) {
                task.content = Newcontent
                await userdata.save()
            }
            res.status(200).json({ msg: 'Alterado com sucesso' })
        }

    },
    async delete(req, res) {
        const id = req.params.id
        const taskId = req.params.taskid
        const userExists = await taskModel.findOne({ _id: id })
        if (!id) {
            res.status(401).json({ msg: 'Erro' })
        } else if (!userExists) {
            res.status(401).json({ msg: 'Erro, Tarefa não existe, ou já foi excluída' })
        } else {
            try {
                userExists.notes.pull({ _id: taskId })
                await userExists.save()
                res.status(200).json({ msg: 'Excluído com sucesso' })
            } catch (err) {
                res.status(401).json({ msg: 'Erro ao deletar' })
            }

        }
    }

}