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
import django_host from './paths'

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [username, setUsername] = useState('');
  const curUser = useMemo(() => ({ username, setUsername }), [username, setUsername]);
  const [error, setError] = useState('');

  useEffect( () => {
    if (loggedIn) {
      fetch(django_host+'api/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
      })
        .then(res => res.json())
        .then(json => {
          setUsername(json.username);
        });
    }
  }, [loggedIn])
  
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUsername('');
    setLoggedIn(false);
  }
  
  const handleLogIn = (e, data, history) => {
    setError('')
    e.preventDefault();
    fetch(django_host+'token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLoggedIn(true)
        setUsername(json.user.username)
        history.push('/')
      })
      .catch( e => {
        console.log("Log in Error")
        console.log(e)
        setError("Invalid Creadentials")
      })
  }

  const handleSignUp = (e, data, history) => {
    e.preventDefault();
    setError('')
    fetch(django_host+'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        setLoggedIn(true)
        setUsername(json.username)
        history.push('/')
      })
      .catch( e => {
        console.log("Sign Up Error")
        console.log(e)
        setError("Unable to register user with these creadentials")
      })
  };

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
                <LogIn handleLogIn={handleLogIn} error={error} setError={setError}/>
              </Route>
              <Route exact path="/signup">
                <SignUp handleSignUp={handleSignUp} error={error} setError={setError}/>
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
