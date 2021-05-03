import { useState, useEffect } from "react"
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert"
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = ({handleSignUp, error, setError}) => {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cpassword, setCpassword] = useState('');
    const history = useHistory()

    useEffect(() => {
        if (cpassword && cpassword !== password) {
            setError("Passwords don't match")
        } 
        if (cpassword === password){
            setError("")
        }
    }, [cpassword, password, setError]);


    return ( 
        <div className="form">
            {error !== '' ?
                <Alert variant="danger"> { error } </Alert> 
             : ''   
            }
            <h2>Create an Account</h2>
            <form onSubmit={ e => handleSignUp (e, {username, email, password, cpassword}, history)}>
            <label>Username:</label>
                <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username" 
                    name="username" 
                />
                <label>Email:</label>
                <input 
                    type="text" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    name="email" />
                <label>Password: </label>
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="pwd" 
                    name="pwd" 
                />
                <input 
                    type="password" 
                    required
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    id="cpwd" 
                    name="cpwd" 
                />
                <Button type='submit'>Create Account</Button>
            </form> 
        </div>
     );
}
 
export default SignUp;