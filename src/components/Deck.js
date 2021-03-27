const Deck = (props) => {
    return ( 
    <div className="home">
        <div className="deck" key={props.id} >
            <h2>{ props.name }</h2>
            <button className="roundButton">Cards</button>
            <button className="roundButton">Study</button>
            <button className="sqaureButton">Delete</button> 
        </div>
    </div> );
}
 
export default Deck;