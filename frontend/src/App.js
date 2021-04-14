import { useState, useMemo, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navbar from './components/Navbbar'
import Home from './components/Home'
import Footer from './components/Footer'
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import NotFound from "./components/NotFound"
import UserContext from "./contexts/UserContext"
import Decks from "./components/Decks"
import Cards from "./components/Cards"
import Study from "./components/Study"
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
