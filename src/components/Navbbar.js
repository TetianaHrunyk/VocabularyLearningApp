import { useContext } from "react"
import { Link } from 'react-router-dom'
import UserContext from "../contexts/UserContext.js"

const Navbar = ({isLoggedIn, handleLogOut}) => {
    const { user } = useContext(UserContext)

    if (user) {
        return (  
            <nav className="navbar">
                <h1>Vocs</h1>
                <div className="links">
                    <Link to='/'>Decks</Link>
                    <Link to='/'>Cards</Link>
                    <Link to='/'>Study</Link>
                    <Link to='/'>Home</Link>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </nav>
        ); 
    } else { 
        return (
            <nav className="navbar">
                <h1>Vocs</h1>
                <div className="links">
                    <Link to='/signup'>Sign up</Link>
                    <Link to='/login'>Log In</Link>
                    <Link to='/'>Home</Link>
                </div>    
            </nav>
        );
    }
}
 
export default Navbar;