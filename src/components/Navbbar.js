const Navbar = (props) => {
    if (props.isLoggedIn) {
        return (  
            <nav className="navbar">
                <h1>Vocs</h1>
                <div className="links">
                    <a href='/decks'>Decks</a>
                    <a href='/cards'>Cards</a>
                    <a href='/study'>Study</a>
                    <a href='/'>Home</a>
                    <a href='/'>Log out</a>
                </div>
            </nav>
        ); 
    } else { 
        return (
            <nav className="navbar">
                <h1>Vocs</h1>
                <div className="links">
                    <a href='/'>Sign up</a>
                    <a href='/'>Log in</a>
                    <a href='/'>Home</a>
                </div>    
            </nav>
        );
    }
}
 
export default Navbar;