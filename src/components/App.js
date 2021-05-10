import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbbar";
import Home from "./Home";
//import Footer from "./Footer";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound";
import UserContext from "../contexts/UserContext";
import Decks from "./Decks";
import Cards from "./Cards";
import Study from "./Study";
import "bootstrap/dist/css/bootstrap.min.css";
import django_host from "./paths";
//import useGetData from "../hooks/useGetData";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [username, setUsername] = useState("");
  const curUser = useMemo(() => ({ username, setUsername }), [
    username,
    setUsername,
  ]);
  const [error, setError] = useState("");
  const [logInTime, setLogInTime] = useState(null);
  //  const deleted = false

  //  const { data } = useGetData(django_host+"api/decks/", "GET", `JWT ${localStorage.getItem('token')}`, deleted)
  //  console.log("Data in Navbar: ", data)

  useEffect(() => {
    if (loggedIn) {
      fetch(django_host + "api/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setUsername(json.id);
      });
      fetch(django_host + "api/decks/", {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "Content-Type": 'application/json; charset="utf-8"',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const decksIds = data.map(elem => elem.id)
          const decksNames = data.map(elem => elem.deckName)
          localStorage.setItem("decksIds", decksIds);
          localStorage.setItem("decksNames", decksNames);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [loggedIn]);

  const handleLogOut = () => {
    localStorage.clear()
    setUsername("");
    setLoggedIn(false);
    setLogInTime(null);
  };

  const handleLogIn = (e, data, history) => {
    localStorage.clear()
    setError("");
    e.preventDefault();
    fetch(django_host + "token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json; charset="utf-8"',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok === true) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((json) => {
        localStorage.setItem("token", json.token);
        setLogInTime(Date.now());
        setUsername(json.user.id);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleSignUp = (e, data, history) => {
    localStorage.clear()
    e.preventDefault();
    setError("");
    fetch(django_host + "api/users/", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json; charset="utf-8"',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.ok === true) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((json) => {
        setLoggedIn(true);
        setUsername(json.id);
        history.push("/login");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={curUser}>
          <Navbar handleLogOut={handleLogOut} logInTime={logInTime} />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <LogIn
                  handleLogIn={handleLogIn}
                  error={error}
                  setError={setError}
                />
              </Route>
              <Route exact path="/signup">
                <SignUp
                  handleSignUp={handleSignUp}
                  error={error}
                  setError={setError}
                />
              </Route>
              <Route exact path="/decks">
                <Decks />
              </Route>
              <Route exact path="/cards/">
                <Cards />
              </Route>
              <Route exact path="/study">
                <Study />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>

      </div>
    </Router>
  );
}

export default App;
