import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from '../apiConfig/api'
export function PrivateRoute({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')

        async function checkToken() {
            if (!id) {
                navigate('/homeLogin')
            } else {
                try {
                    const response = await api.get(`/logged/${id}`, {
                        headers: {
                            'x-access-token': token
                        }
                    })
                    localStorage.setItem('userdata', JSON.stringify(response.data))
                    setIsAuth(true)
                } catch (err) {
                    alert(err.response.data.msg)
                    navigate('/homeLogin')
                }
            }
        }
        checkToken()


    }, [])

    return isAuth ? children : null
}