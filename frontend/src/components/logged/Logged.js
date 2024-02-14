export function Logged() {
    const userdata = JSON.parse(localStorage.getItem('userdata'))
    return (
        <div>
            <h1>Bem vindo {userdata.name}</h1>
        </div>
    )
}