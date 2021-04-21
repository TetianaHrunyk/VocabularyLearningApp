import { useState } from "react";
import { useContext } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import django_host from "./paths";
import Alert from "react-bootstrap/Alert";
import UserContext from "../contexts/UserContext.js";
import useGetData from "../hooks/useGetData";
import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

const Decks = () => {
  const [deleted, setDeleted] = useState(false);
  const [created, setCreated] = useState(false);
  const { data, isPending, error } = useGetData(
    django_host + "api/decks/",
    "GET",
    `JWT ${localStorage.getItem("token")}`,
    deleted,
    created
  );
  const [newDeckName, setNewDeckName] = useState("");
  const [apiError, setApiError] = useState("");
  const { username: user } = useContext(UserContext);

  /*
  useEffect(() => {
    return () => {
      setDeleted(false);
      setCreated(false);
    };
  });*/

  const handleCreateNewDeck = (e, data) => {
    e.preventDefault();
    fetch(django_host + "api/decks/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setCreated(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch(django_host + "api/decks/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const decksIds = data.map((elem) => elem.id);
        const decksNames = data.map((elem) => elem.deckName);
        localStorage.setItem("decksIds", decksIds);
        localStorage.setItem("decksNames", decksNames);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewDeckName("");
    setCreated(!created);
  };

  const handleEdit = (e) => {
    console.log("edit");
    fetch(django_host + "api/decks/"+e.target.value, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setCreated(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch(django_host + "api/decks/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const decksIds = data.map((elem) => elem.id);
        const decksNames = data.map((elem) => elem.deckName);
        localStorage.setItem("decksIds", decksIds);
        localStorage.setItem("decksNames", decksNames);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewDeckName("");
    setCreated(!created);
  };

  const handleDelete = (e) => {
    fetch(django_host + "api/decks/" + e.target.value, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then(
        () => setDeleted(true)
      )
      .catch((e) => {
        console.log("Error: ", e.message);
        setApiError(e.message);
      });
    fetch(django_host + "api/decks/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const decksIds = data.map((elem) => elem.id);
        const decksNames = data.map((elem) => elem.deckName);
        localStorage.setItem("decksIds", decksIds);
        localStorage.setItem("decksNames", decksNames);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setDeleted(!deleted);
  };

  function makeDeck(data) {
    return data.map((deck) => {
      return (
        <Card style={{ minWidth: "30%" }} key={deck.id}>
          <Card.Body>
            <Card.Title>{deck.deckName}</Card.Title>
            <Card.Text>Created: {deck.created}</Card.Text>
            <Link to={{ pathname: '/cards', state: {deckId: deck.id} }}>
              <button value={deck.id} >
                Browse Cards
              </button>
            </Link>
            <button value={deck.id} onClick={(e) => handleDelete(e)}>
              Delete
            </button>
          </Card.Body>
        </Card>
      );
    });
  }

  return (
    <div className="home">
      <h2>Decks</h2>
      {apiError !== "" ? <Alert variant="danger"> {apiError} </Alert> : ""}
      <form
        onSubmit={(e) =>
          handleCreateNewDeck(e, { deckName: newDeckName, user })
        }
      >
        <br />
        <label>Create a New Deck:</label>
        <br />
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          id={"newDeckName" + newDeckName}
          name={"newDeckName" + newDeckName}
        />
        <button type="submit">Create</button>
      </form>
      <br />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          <CardDeck>{makeDeck(data)}</CardDeck>
        </div>
      )}
    </div>
  );
};

export default Decks;
