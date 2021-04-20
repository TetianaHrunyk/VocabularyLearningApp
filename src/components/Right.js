import { useContext } from "react"
import Card from "react-bootstrap/Card"
import CardDeck from 'react-bootstrap/CardDeck'
import UserContext from "../contexts/UserContext"

const Right = ({parsed, queue, handleAdd, add }) => {
  const { user } = useContext(UserContext)

  function mapQueue(queue) {
    return (
      Object.keys(queue)
      .filter( word => word !== " ")
      .map((word) => {
        return (
          <Card style={{ minWidth: "60%"}} key={word}>
            <Card.Body >
              <Card.Title>
                {word}
              </Card.Title>
              <Card.Text>
                {queue[word]}
              </Card.Text>
              {localStorage.getItem("token") ? <button value = {word} onClick = {handleAdd}> {word in add ? "Drop" : "Add" }</button> : <br/>}
              
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
            You don't have any translations yet
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
          <Card.Text as="div" style={{overflowY: "auto", maxHeight: "400px"}}>
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