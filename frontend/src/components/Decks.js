import { useState, useEffect } from "react"
import { useContext } from "react"
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import django_host from './paths'
import Alert from "react-bootstrap/Alert"
import UserContext from "../contexts/UserContext.js"
import useGetData from "../hooks/useGetData"

const Decks = () => {
  const [deleted, setDeleted] = useState(false);
  const [created, setCreated] = useState(false);
  const { data, isPending, error } = useGetData(django_host+"api/decks/", "GET", `JWT ${localStorage.getItem('token')}`, deleted, created)
  const [newDeckName, setNewDeckName] = useState('');
  const [apiError, setApiError] = useState('');
  const { username: user } = useContext(UserContext)

  useEffect(() => {
    console.log("Effect: ", deleted)
    return () => {
      setDeleted(false)
      setCreated(false)
    };
  });
  
  const handleCreateNewDeck = (e, data) => {
    e.preventDefault()
    console.log("data should be here");
    console.log(JSON.stringify(data));
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
        console.log("Success:", data);
        setCreated(true)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewDeckName("");
  };

  const handleEdit = (e) => {
    console.log("edit")
  }

  const handleDelete = (e) => {
    fetch(django_host+'api/decks/'+e.target.value, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(() =>
      setDeleted(true)
    )
    .catch( e => {
      console.log("Error: ", e.message)
      setApiError(e.message)
    })
  }


  function makeDeck(data) {
    return data.map( deck => {
      return (
        <Card style={{minWidth: "30%"}} key={deck.id}>
          <Card.Body>
            <Card.Title >
              {deck.deckName}
            </Card.Title>
            <Card.Text>
              Created: {deck.created}
            </Card.Text>
            <button value={deck.id} onClick={e => handleEdit(e)}>Edit</button>
            <button value={deck.id} onClick={e => handleDelete(e)}>Delete</button>
          </Card.Body>
        </Card>
      )
    })
  }

  return (
    <div className="home">
      <h2>Decks</h2>
      {apiError !== '' ?
                <Alert variant="danger"> { apiError } </Alert> 
             : ''   
      }
      <form onSubmit={(e) => handleCreateNewDeck(e, {deckName: newDeckName, user}) }>
        <br />
        <label>Create a New Deck:</label>
        <br />
        <input
          type="text"
          required
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          id={"newDeckName"+newDeckName}
          name={"newDeckName"+newDeckName}
        />
        <button type='submit'>Create</button>
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
}
 
export default Decks;