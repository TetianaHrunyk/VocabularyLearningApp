const BrowseCard = (props) => {
    return ( 
    <div className="home">
        <div className="card" key={props.id} >
            <h2>{ props.name }</h2>
            <p>{props.front}</p>
            <p>{props.context}</p>
            <p>{props.front}</p>
            <button className="roundButton">Show Later</button>
            <button className="roundButton">Submit Answer</button>
        </div>
    </div> );
}
 
export default BrowseCard;