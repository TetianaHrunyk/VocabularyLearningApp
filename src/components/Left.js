import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.min.css";
//import UserContext from "../contexts/UserContext"


const Left = (props) => {
 // const { text, parsed, handleParse, handleText , queue, handleWordClick, back, handleBack} = props
 const { text, parsed, handleParse, handleText , handleWordClick, handleBack} = props

  function parseText(text) {
    return (
      text.split(" ")
      .filter( elem => elem !== " ")
      .map(elem => elem.toLowerCase().replace(/[^\w\s]|_/g, ""))
      .map(elem => {
        return (
            <button value = {elem} 
              onClick={handleWordClick} 
              key={elem+Math.floor(Math.random() * 1000)}
            >
              {elem}
            </button>
        )
      })
    )
  }
  
  if (!parsed) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Input Text
          </Card.Title>
          <Form.Control
            as='textarea'
            placeholder='Input text'
            value={text}
            onChange={handleText}
          />
          
          <button type='submit' onClick={handleParse}>Parse</button>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Input Text
          </Card.Title>
            {parseText(text)}
          <Card.Text>
            <br />
          </Card.Text>
          <button onClick={handleBack}>Back</button>
        </Card.Body>
      </Card>
    )
  }
}
 
export default Left;