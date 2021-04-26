import {useState} from "react";
import {useHistory} from "react-router-dom"
import Alert from "react-bootstrap/Alert"
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";

localStorage.clear()

const LogIn = ({handleLogIn, error, setError}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    return ( 
        <div className="form">
            {error !== '' ?
                <Alert variant="danger"> { error } </Alert> 
             : ''   
            }
            <h2>Log in</h2>
            <form onSubmit={ e => handleLogIn(e, {username, password}, history) }>
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