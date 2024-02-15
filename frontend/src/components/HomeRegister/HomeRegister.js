import styles from './Home.module.css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../apiConfig/api'
export function HomeRegister() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleName(e) {
        setName(e.target.value)
    }
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }
    async function handleSubmit() {
        try {
            const response = await api.post('/register', {
                name,
                email,
                password
            })
            alert(response.data.msg)
            setName('')
            setEmail('')
            setPassword('')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.register}>
                <div className={styles.register0}>
                    <h1>Crie sua conta</h1>
                    <p>ou</p>
                    <Link to={'/homeLogin'}>Entrar</Link>
                </div>

                <form action="">
                    <div className={styles.register1}>
                        <label htmlFor="Nome">Primeiro nome ou apelido</label>
                        <input type="text"
                            value={name}
                            onChange={handleName}
                            maxLength={12}

                        />

                    </div>
                    <div className={styles.register1}>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={handleEmail} />
                    </div>
                    <div className={styles.register1}>
                        <label htmlFor="senha">Senha</label>
                        <input type="password" value={password} onChange={handlePassword} />
                    </div>
                </form>
                <button onClick={handleSubmit}>Criar conta</button>
            </div>
        </div>
    )
}