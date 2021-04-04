import useFetch from '../hooks/useFetch'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const Decks = () => {
  const { data, isPending, error } = useFetch('./sampleDecks.json');

  const handleDelete = (e) => {
    console.log("delete")
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
      { data && <CardDeck>{makeDeck(data)}</CardDeck>  }
    </div>
  );
}
 
export default Decks;