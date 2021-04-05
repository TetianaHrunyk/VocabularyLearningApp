import { useState } from "react"
import useFetch from '../hooks/useFetch'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const Decks = () => {
  const { data, isPending, error } = useFetch('./sampleDecks.json');
  const [sort, setSort] = useState("added");

  const handleEdit = (e) => {
    console.log("edit")
  }

  const handleDelete = (e) => {
    console.log("delete")
  }

  const handleSort = (e => {
    setSort(e.target.value)
    console.log(sort)
  })

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
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </Card.Body>
        </Card>
      )
    })
  }

  return ( 
    <div className="home">
      <h2>Decks</h2>
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
        <CardDeck>{makeDeck(data)}</CardDeck>  
      </div>
      }
    </div>
  );
}
 
export default Decks;