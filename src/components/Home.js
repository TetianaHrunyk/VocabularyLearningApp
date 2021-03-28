import Form from "react-bootstrap/Form"
import {Col} from "react-bootstrap"

const  Home = () => {
    return (
        <div className="home">
            <h2>Homepage</h2>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="Input text" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Translation" />
                    </Col>
                </Form.Row>
            </Form>
        </div> 
    );
}
 
export default Home;