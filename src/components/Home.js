import {useState} from "react"
import Form from "react-bootstrap/Form"
import {Col, Row, Container, Button, Card} from "react-bootstrap"
import CustomForm from "./CustomForm"
import CustomDeck from "./CustomDeck"

const  Home = () => {
    const [parsed, setParse] = useState(false);
    const [text, setText] = useState("");

    
    const handleParse = ( (e) => {
        setParse(true)
    })

    const handleText = ( (e) => {
        setText(e.target.value)
    })

    return (
        <div className="home">
            <h2>Homepage</h2><br />
            {!parsed ? 
                    <CustomForm text = {text} parsed={parsed} handleParse={handleParse} handleText={handleText}/> : 
                    <CustomDeck text={text} />
            }            
        </div> 
    );
}
 
export default Home;