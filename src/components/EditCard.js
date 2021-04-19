import ContentEditable from 'react-contenteditable'
import { useRef } from "react"
import Card from "react-bootstrap/Card"

const EditCard = () => {
  const title = useRef("Some title");

  const handleTitle = ( e => {
    title.current = e.target.value
  })


  return ( 
    <div>
      <h2>Cards</h2>
      <Card>
        <Card.Body>
          <Card.Title>
            Sample Card
          </Card.Title>
          <Card.Text>
            <ContentEditable
              html={title.current}
              onChange={handleTitle} // handle innerHTML change
              tagName='Card.Body.Text' // Use a custom HTML tag (uses a div by default)
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
 
export default EditCard;