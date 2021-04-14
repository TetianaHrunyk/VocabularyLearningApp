import { useState, useMemo, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from './Navbbar'
import Home from './Home'
import Footer from './Footer'
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import NotFound from "./NotFound"
import UserContext from "../contexts/UserContext"
import Decks from "./Decks"
import Cards from "./Cards"
import Study from "./Study"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(false);
  const curUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const handleLogOut = () => {
    setUser(null);
  }
  
  const handleLogIn = (username) => {
    setUser(username);
  }

  useEffect( () => {
    window.addEventListener("onbeforeunload", (e) => {
      console.log("prevent")
    }) 
  })

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={curUser}>
          <Navbar handleLogOut={handleLogOut} />
          <div className="content">
            <Switch>
              <Route exact path="/" >
                <Home />
              </Route>
              <Route exact path="/login">
                <LogIn handleLogIn={handleLogIn} />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/decks">
                <Decks />
              </Route>
              <Route exact path="/cards">
                <Cards />
              </Route>
              <Route exact path="/study">
                <Study />
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
