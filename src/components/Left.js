import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

const Left = ({ text, parsed, handleParse, handleText , queue, handleWordClick}) => {

  function parseText(text) {
    return (
      text.split(" ").map((elem) => {
        return (
            <button value = {elem} onClick={handleWordClick}>
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
        </Card.Body>
      </Card>
    )
  }
}
 
export default Left;