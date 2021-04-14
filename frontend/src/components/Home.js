import { useState, useContext, useEffect, useMemo } from "react"
import { Col, Row, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Left from "./Left"
import Right from "./Right"
//import useTranslate from "../hooks/useTranslate"
//import UserContext from "../contexts/UserContext"



const Home = () => {
    //Destructure context    
//    const { user } = useContext(UserContext)

    const history = useHistory()
    const [parsed, setParse] = useState(false);
    const [text, setText] = useState("");
    const [queue, setQueue] = useState({})
    const [add, setAdd] = useState({});
    const [back, setBack] = useState(false);
   // const [word, setWord] = useState(" ");
    
   // const {data: newQueue} = useTranslate(word, )


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
        if (e.target.value in queue ) {
            const { [e.target.value]: tmp, ...rest } = queue;
            setQueue(rest)
        } else {
            setQueue({ ...queue, [e.target.value]: "Loading..."})
        }
        
    })

    const handleAdd = (e => {
        if (e.target.value in add ) {
            const { [e.target.value]: tmp, ...rest } = add;
            setAdd(rest)
        } else {     
            setAdd({ ...add, [e.target.value]: queue[[e.target.value]]})
        }
         
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