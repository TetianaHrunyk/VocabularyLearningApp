import { useState, useMemo } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from './components/Navbbar'
import Home from './components/Home'
import Footer from './components/Footer'
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import NotFound from "./components/NotFound"
import UserContext from "./contexts/UserContext"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(false);

  const curUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const handleLogOut = () => {
    setUser(null);
  }
  
  const handleLogIn = () => {
    setUser('SomeUser');
  }

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={curUser}>
          <Navbar isLoggedIn={user} handleLogOut={handleLogOut} />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <LogIn isLoggedIn={user} handleLogIn={handleLogIn} />
              </Route>
              <Route path="/signup">
                <SignUp />
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
