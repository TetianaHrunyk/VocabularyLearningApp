import Form from "react-bootstrap/Form"
import {Col, Row, Container, Button} from "react-bootstrap"

const CustomForm = ( {text, parsed, handleParse, handleText}) => {

    return ( 
            <Container>
                <Row>
                    <Col>
                        <h3>Input Text</h3>
                    </Col>
                    <Col>
                        <h3>Translation</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control 
                            as='textarea'
                            placeholder='Input text'
                            value = {text} 
                            onChange={handleText}
                        />
                        <Button type='submit' onClick={handleParse}>Parse</Button>  
                    </Col>
                    <Col as="article">
                        <Form.Control as="textarea" placeholder="Input text" />
                    </Col>
                </Row>
            </Container>
     );
}
 
export default CustomForm;