import {useState} from "react"
import Navbar from './components/Navbbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import NotFound from "./components/NotFound"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogOut = () => {
    setIsLoggedIn(false);
  }
  const handleLogIn = () => {
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn}  handleLogOut={handleLogOut}/>
        <div className="content">
          
          <Switch>
            <Route exact path="/">
              <Home />
            </Route> 
            <Route path="/login">
              <LogIn isLoggedIn={isLoggedIn} handleLogIn={handleLogIn}/>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
