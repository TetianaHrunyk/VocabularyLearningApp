import Card from "react-bootstrap/Card"

const CustomDeck = ({text}) => {
/*    const cards = text.split(" ").map( (elem) => {
        return (<Card>
                    <Card.Body>
                        <Card.Title>
                            elem
                        </Card.Title>
                    </Card.Body>
                </Card>
        )
    })
    
    return ( 
        <Card.CardDeck>
            {cards}
        </Card.CardDeck>
    );*/
    return (
        text.split(" ").map((elem) => {
            return (
            <span className="parsed">
                <button >
                    {elem}
                </button>
            </span>
            )
        })
    )
}
 


export default CustomDeck;