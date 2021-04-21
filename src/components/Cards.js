import { useState} from "react";
import { useContext } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import django_host from "./paths";
import Alert from "react-bootstrap/Alert";
import UserContext from "../contexts/UserContext.js";
import useGetData from "../hooks/useGetData";
import { Row, Col } from "react-bootstrap";
import {useLocation} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

const Cards = () => {
  let locationData = useLocation();
  const [deleted, setDeleted] = useState(false);
  const [created, setCreated] = useState(false);
  const [deck, setDeck] = useState( locationData.state?.deckId || null);
  
  const { data, isPending, error } = useGetData(
                                      django_host + "api/cards/",
                                      "GET",
                                      `JWT ${localStorage.getItem("token")}`,
                                      deleted,
                                      created,
                                      deck
                                    );
  const cards = data || [];

  const [newCardName, setNewCardName] = useState("");
  const [back, setBack] = useState("");
  const [apiError, setApiError] = useState("");
  const { username: user } = useContext(UserContext);

  const [sort, setSort] = useState("added");

  const decksNames = localStorage.getItem("decksNames").split(",");
  const decksIds = localStorage.getItem("decksIds").split(",");
  const zipped = zip(decksIds, decksNames);

  const handleCreateNewCard = (e) => {
    e.preventDefault();
    const intDeck = parseInt(deck);
    const data = { front: newCardName, back, deck: intDeck, user };
    fetch(django_host + "api/cards/", {
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
    setNewCardName("");
    setBack("");
    setCreated(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("edit");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(django_host + "api/cards/" + e.target.value, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then(() => setDeleted(true))
      .catch((e) => {
        console.log("Error: ", e.message);
        setApiError(e.message);
      });
    setDeleted(false);
  };

  function makeSelectDeck(defDeck) {
    return zipped.map((deck) => {
      return (
        <option value={deck[0]} key={deck[0]}>
          {deck[1]}
        </option>
      );
    });
  }

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleDeck = (e) => {
    setDeck(e.target.value);
  };

  function parseDate(timestamp){
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  function makeDeck(data, deck, sort) {
    const deckInt = parseInt(deck);

    if (deck === null) {
      return <div></div>;
    } else {
      return data
        .filter((card) => card.deck === deckInt)
        .sort((a, b) => a[sort] > b[sort])
        .map((card) => {
          return (
            <Card style={{ minWidth: "30%" }} key={card.id}>
              <Card.Body>
                <Card.Title>{card.front}</Card.Title>
                <Card.Text>
                  <u>Back:</u> {card.back}
                  <br />
                  <u>Added:</u> { parseDate(card.added) }
                  <br />
                  <u>Revised:</u> { parseDate(card.revised) }
                  <br />
                </Card.Text>
                <button value={card.id} onClick={(e) => handleEdit(e)}>
                  Edit
                </button>
                <button value={card.id} onClick={(e) => handleDelete(e)}>
                  Delete
                </button>
              </Card.Body>
            </Card>
          );
        });
    }
  }

  return (
    <div className="home">
      <h2>
        {deck
          ? "Cards in " + zipped.filter((elem) => elem[0] == deck)[0][1]
          : "Select deck"}
      </h2>
      {apiError !== "" ? <Alert variant="danger"> {apiError} </Alert> : ""}
      <br />
      {deck !== null ? (
        <div>
          <h5>
            Add a New Card to{" "}
            <strong>{zipped.filter((elem) => elem[0] == deck)[0][1]}</strong>
          </h5>
          <form onSubmit={(e) => handleCreateNewCard(e)}>
            <input
              type="text"
              placeholder="Front"
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              id={"newCardName" + newCardName}
              name={"newCardName" + newCardName}
            />
            <br />
            <input
              type="text"
              placeholder="Back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              id={"back" + newCardName}
              name={"back" + newCardName}
            />
            <br />
            <button type="submit">Create</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <br />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          <Row>
            <Col>
              <h5>Deck: </h5>
              <select
                name="deck"
                onChange={(e) => handleDeck(e)}
                defaultValue={deck ? deck : "-------"}
              >
                {!deck ? (
                  <option key="dummy" value="dummy">
                    --------
                  </option>
                ) : (
                  ""
                )}
                {makeSelectDeck(deck)}
              </select>
            </Col>
            <Col>
              <h5>Sort by: </h5>
              <select
                name="sort"
                onChange={(e) => handleSort(e)}
                defaultValue={sort}
              >
                <option value="added">Added</option>
                <option value="revised">Revised</option>
                <option value="front">Front</option>
                <option value="back">Back</option>
              </select>
            </Col>
          </Row>
          <CardDeck>{makeDeck(cards, deck, sort)}</CardDeck>
        </div>
      )}
    </div>
  );
};

export default Cards;
