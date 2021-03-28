import {useState} from "react";
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button'

const LogIn = ({isLoggedIn, handleLogIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogIn()
        history.push('/')
    }

    return ( 
        <div className="form">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username" 
                    name="username" 
                />
                <label>Password: </label>
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="pwd" 
                    name="pwd" 
                />
                <Button type = "submit">Log in</Button>
            </form> 
        </div>
     );
}
 
export default LogIn;