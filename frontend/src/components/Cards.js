import useFetch from '../hooks/useFetch'
import {useState} from "react"
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const Cards = () => {
  const { data, isPending, error } = useFetch('./sampleCards.json');
  const userDecks = [{"id": 124, "name": "Deck2" }, {"id": 123, "name": "Deck1" }]

  const [deck, setDeck] = useState("124");
  const [sort, setSort] = useState("added");

  const handleEdit = (e) => {
    console.log("edit")
  }

  const handleDelete = (e) => {
    console.log("delete")
  }

  const handleSort = (e => {
    setSort(e.target.value)
  })

  const handleDeck = (e => {
    setDeck(e.target.value)
  })

  function makeDeck(data, deck, sort) {
    return data.filter(card => card.deckId == deck)
      .sort(card => card.sort)
      .map( card => {
      return (
        <Card style={{minWidth: "30%"}} key={card.id}>
          <Card.Body>
            <Card.Title >
              {card.deckName}
            </Card.Title>
            <Card.Text>
              Front: {card.front}<br />
              Back: {card.back}<br />
              Context: {card.context}<br />
              Added: {card.added}<br />
              Revised: {card.revised}<br />
            </Card.Text>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </Card.Body>
        </Card>
      )
    })
  }

  function makeSelectDeck(decks) {
    return decks.map( deck => {
      return <option value={deck.id} key={deck.id}>{deck.name}</option>
    })
  }

  return ( 
    <div className="home">
      <h2>Cards in {deck} </h2>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { data && 
        <div>

            <select name="sort" onChange={handleSort}>
              <option value="added">Added</option>
              <option value="revised">Revised</option>
              <option name="front">Front</option>
              <option name="back">Back</option>
            </select>

            <select name="sort" onChange={handleDeck}>
              {makeSelectDeck(userDecks)}
            </select>

          <CardDeck>{makeDeck(data, deck, sort)}</CardDeck>  
        </div>
      }
    </div>
  );
}
 
export default Cards;