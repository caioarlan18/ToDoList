import styles from './Logged.module.css'
import api from '../apiConfig/api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";

export function Logged() {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [allNotes, setAllNotes] = useState([])
    const [Newtitle, setNewtitle] = useState('')
    const [Newcontent, setNewcontent] = useState('')
    async function createTask(e) {
        e.preventDefault()
        try {
            const response = await api.post(`/createtask/${userdata._id}`, {
                title,
                content
            })
            setTitle('')
            setContent('')
            window.location.reload()
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    useEffect(() => {
        async function showAllNotes() {
            const response = await api.get(`alltasks/${userdata._id}`)
            setAllNotes(response.data)
        }
        showAllNotes()
    }, [])

    async function handleDelete(taskid,) {
        try {
            const response = await api.delete(`/deletetask/${userdata._id}/${taskid}`)
            window.location.reload()
        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    async function handleUpdate(taskid) {
        try {
            const response = await api.post(`/updatetask/${userdata._id}/${taskid}`, {
                Newtitle,
                Newcontent
            })
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    function handleTitle(e) {
        setTitle(e.target.value)
    }
    function handleContent(e) {
        setContent(e.target.value)
    }
    return (
        <div className={styles.logged}>
            <Link to={'/'}>Voltar</Link>
            <div className={styles.logged1}>
                <form action="">
                    <h1>Olá {userdata.name}, Crie sua anotação</h1>
                    <div>
                        <label htmlFor="title">Título</label>
                        <input type="text" value={title} onChange={handleTitle} />
                    </div>
                    <div>
                        <label htmlFor="content">Conteúdo</label>
                        <textarea
                            value={content}
                            onChange={handleContent}
                            maxLength={200}
                        ></textarea>
                    </div>
                    <button onClick={createTask}>Criar</button>
                </form>
            </div>
            <div className={styles.logged2}>
                {allNotes.map((note, index) => (
                    <div className={styles.notes} key={index}>
                        <span onClick={() => handleDelete(note._id)}><FaRegTrashAlt /></span>
                        <div className={styles.notes1}>
                            <input type="text" defaultValue={note.title}
                                onBlur={() => handleUpdate(note._id)}
                                onChange={(e) => setNewtitle(e.target.value)}
                            />
                        </div>
                        <div className={styles.notes1}>
                            <textarea
                                defaultValue={note.content}
                                onBlur={() => handleUpdate(note._id)}
                                onChange={(e) => setNewcontent(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}