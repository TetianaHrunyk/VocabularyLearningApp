import { useState, useContext, useEffect } from "react"
import { Col, Row, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Left from "./Left"
import Right from "./Right"
import UserContext from "../contexts/UserContext"

const Home = () => {
    //Destructure context    
    const { user } = useContext(UserContext)

    const history = useHistory()

    const [parsed, setParse] = useState(false);
    const [text, setText] = useState("");
    const [queue, setQueue] = useState([])
    const [add, setAdd] = useState([]);
    const [back, setBack] = useState(false);

    
    useEffect( () => {
        window.addEventListener("popstate", e => {
            history.push('/')
            setParse(false)
            setBack(false)
        })
    })

    const handleParse = (e => {
        setBack(false)
        setParse(true)
        history.push('/')
    })

    const handleText = (e => {
        setText(e.target.value)
    })

    const handleBack = ( e => {
        setBack(true)
        setParse(false)
    })

    const handleWordClick = ( e => {
        queue.includes(e.target.value) ?
        setQueue(queue.filter(item => item !== e.target.value)) :
        setQueue(queue => [...queue, e.target.value])
    })

    const handleAdd = (e => {
        add.includes(e.target.value) ?
            setAdd(add.filter(item => item !== e.target.value)) :
            setAdd(add => [...add, e.target.value])
         
    })

    return (
        <div className="home">
            <h2>Homepage</h2><br />
            <Container>
                <Row>
                    <Col>
                        <Left 
                            text={text} 
                            parsed={parsed} 
                            handleParse={handleParse} 
                            handleText={handleText}
                            queue = {queue}
                            handleWordClick = {handleWordClick} 
                            back={back}
                            handleBack={handleBack}
                        />
                        
                    </Col>
                    <Col>
                        <Right 
                            parsed={parsed}
                            queue = {queue}
                            handleAdd = {handleAdd}
                            add = {add}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;