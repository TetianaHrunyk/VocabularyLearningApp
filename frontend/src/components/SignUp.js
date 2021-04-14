import { useState } from "react"
import Button from 'react-bootstrap/Button'

const SignUp = ({handleSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cpassword, setCpassword] = useState('');

    return ( 
        <div className="form">
            <h2>Create an Account</h2>
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