import Card from "react-bootstrap/Card"
import CardDeck from 'react-bootstrap/CardDeck'
import UserContext from "../contexts/UserContext"

const Right = ({parsed, queue, handleAdd, add }) => {

  function mapQueue(queue) {
    return (
      queue.map(elem => {
        return (
          <Card style={{ minWidth: "60%"}}>
            <Card.Body >
              <Card.Title>
                {elem}
              </Card.Title>
              <Card.Text>
                Translation for {elem}
              </Card.Text>
              <button value = {elem} onClick = {handleAdd}>{ add.includes(elem)? "Drop" : "Add"}</button>
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
    console.log(add)
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Translations
          </Card.Title>
          <Card.Text as="div" style={{overflow: "auto", maxHeight: "300px"}}>
            <CardDeck>
              {mapQueue(queue)}
            </CardDeck>
          </Card.Text>  
        </Card.Body>
      </Card>
    )
  }

}

export default Right;