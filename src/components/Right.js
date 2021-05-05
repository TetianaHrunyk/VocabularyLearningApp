import { useContext } from "react"
import Card from "react-bootstrap/Card"
import styled from '@emotion/styled';
import CardDeck from 'react-bootstrap/CardDeck'
import UserContext from "../contexts/UserContext"
import "bootstrap/dist/css/bootstrap.min.css";
import { Droppable, Draggable, DragDropContext} from "react-beautiful-dnd"

const grid = 6;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 400px;
`;
const buttonStyle = {
  border: "0",
  padding: "2px",
  fontSize: "14px",
  alignSelf: "center !important", 
  justufySelf: "center"
}

const scrollContainerStyle = Object

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#66b3ff" : "#ffccff",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "#ffe6ff",
  padding: grid,
  width: "100%"
});

const Right = ({parsed, queue, handleAdd, add }) => {
  //eslint-disable-next-line
  const { user } = useContext(UserContext)

  function mapQueue(queue) {
    return (
      Object.keys(queue)
      .filter( word => word !== " ")
      .map((word) => {
        return (
          <Card style={{ minWidth: "60%"}} key={word}>
            <Card.Body >
              <Card.Title>
                {word}
              </Card.Title>
              <Card.Text>
                {queue[word]}
              </Card.Text>
              {localStorage.getItem("token") ? 
              <button value = {word} onClick = {handleAdd}> 
              {word in add ? "Drop" : "Add" }</button> : <br/>}
              
            </Card.Body>
          </Card>
        )
      })
    )
  }

  if (!parsed) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Translations
          </Card.Title>
          <Card.Text>
            You don't have any translations yet
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Translations
          </Card.Title>
          <DragDropContext>
              <ScrollContainer style={{scrollContainerStyle}}>
              <Droppable droppableId="droppable" isCombineEnabled>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >

                    {Object.keys(queue)
                    .filter( word => word !== " ")
                    .map((word, index) => {
                      return (
                        <Draggable key={word+index} draggableId={word+index} index={index} >
                          {(provided, snapshot) => (
                            <div 
                              ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                            >
                              <strong>{word}</strong>
                              <br/>
                              {queue[word]}
                              <br />
                              {localStorage.getItem("token") ? 
                              <button value = {word} onClick = {handleAdd} style={buttonStyle}> 
                                {word in add ? "Drop" : "Add" }
                              </button> :
                               <br/>}
                            </div>
                          )} 
                        </Draggable>
                      )}
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              </ScrollContainer>
            </DragDropContext>  
        </Card.Body>
      </Card>
    )
  }
}

export default Right;