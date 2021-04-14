import { useContext } from "react"
import { Link } from 'react-router-dom'
import UserContext from "../contexts/UserContext.js"

const Navbar = ({handleLogOut}) => {
    const { user } = useContext(UserContext)

    if (user) {
        return (  
            <nav className="navbar">
                <h1>Vocs</h1>
                <div className="links">
                    <Link to='/decks'>Decks</Link>
                    <Link to='/cards'>Cards</Link>
                    <Link to='/study'>Study</Link>
                    <Link to='/'>Home</Link>
                    <Link to='/' onClick={handleLogOut}>Log Out</Link>
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