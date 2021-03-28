import Form from "react-bootstrap/Form"
import {Col, Row, Container, Button} from "react-bootstrap"

const  Home = () => {
    return (
        <div className="home">
            <h2>Homepage</h2><br />
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
                        <Form.Control as="textarea" placeholder="Input text" />
                        <Button type="submit">Translate</Button>
                    </Col>
                    <Col as="article">
                        <p>Translation</p>
                    </Col>
                </Row>
            </Container>
        </div> 
    );
}
 
export default Home;