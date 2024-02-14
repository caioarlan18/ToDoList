import styles from '../HomeRegister/Home.module.css'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../apiConfig/api'
import { useNavigate } from 'react-router-dom';
export function HomeLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    async function handleSubmit() {
        try {
            const response = await api.post('/login', {
                email,
                password
            })
            alert(response.data.msg)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            navigate('/logged')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.register}>
                <div className={styles.register0}>
                    <h1>Entre com sua conta</h1>
                    <p>ou</p>
                    <Link to={'/'}>Criar conta</Link>
                </div>

                <form action="">
                    <div className={styles.register1}>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={handleEmail} />
                    </div>
                    <div className={styles.register1}>
                        <label htmlFor="senha">Senha</label>
                        <input type="password" value={password} onChange={handlePassword} />
                    </div>
                </form>
                <button onClick={handleSubmit}>Entrar</button>
            </div>
        </div>
    )
}