import {useState} from "react";
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button'

const LogIn = ({handleLogIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    function validatePassword(pass) {
        return true;
    }
    
    const handleSubmit = (e) => {
        if (validatePassword(password)){
            e.preventDefault()
            handleLogIn(username)
            history.push('/')
        } else {
            console.log("wrong password")
        }
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