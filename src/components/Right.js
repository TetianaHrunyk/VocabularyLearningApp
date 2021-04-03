import Card from "react-bootstrap/Card"
import CardDeck from 'react-bootstrap/CardDeck'

const Right = ({parsed, queue, handleAdd, add }) => {

  function mapQueue(queue) {
    return (
      queue.map(elem => {
        return (
          <Card>
            <Card.Body>
              <Card.Title>
                {elem}
              </Card.Title>
              <Card.Text>
                Translation for {elem}
              </Card.Text>
              <button value = {elem} onClick = {handleAdd}>Add</button>
            </Card.Body>
          </Card>
        )
      })
    )
  }

  if (!parsed) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Translations
          </Card.Title>
          <Card.Text>
            Nothing here yet
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Translations
          </Card.Title>
          <Card.Text>
            <CardDeck>
              {mapQueue(queue)}
            </CardDeck>
            <br/>
            {add}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

}

export default Right;