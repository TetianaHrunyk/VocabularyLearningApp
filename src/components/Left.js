import { useState, useEffect } from "react"
import styled from '@emotion/styled';
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.min.css";
import { Droppable, Draggable, DragDropContext} from "react-beautiful-dnd"

//import UserContext from "../contexts/UserContext"

const grid = 8;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 250px;
`;

const scrollContainerStyle = Object

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});


const Left = (props) => {
 // const { text, parsed, handleParse, handleText , queue, handleWordClick, back, handleBack} = props
 const { text, parsed, handleParse, handleText , handleWordClick, handleBack} = props
  const [words, setWords] = useState([]);
         
  useEffect(() => {
    var counter = 0
    setWords(text.split(" ").filter( elem => elem !== " ")
                  .map(elem => elem.toLowerCase().replace(/[^\w\s]|_/g, ""))
                  .map(elem => {counter++; return {val: elem, id: counter}})
            )
  }, [text]);

  function onDragStart() {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  function onDragEnd(result) {
    
    if (result.combine) {
      const merged = result.combine.draggableId+" "+result.draggableId

      setWords(words
        .filter(elem => elem.id !== result.source.index)
        .map(elem => {
          if (elem.val+elem.id === result.combine.draggableId) {
            return {val: merged.replace(/[\d]|_/g, ""), id: elem.id}
          } else { 
            return elem 
          }
        }))
    }

  }
  
  if (!parsed) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>
            Input Text
          </Card.Title>
          <Form.Control
            as='textarea'
            placeholder='Input text'
            value={text}
            onChange={handleText}
          />
          
          <button type='submit' onClick={handleParse}>Parse</button>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Input Text</Card.Title>
            <DragDropContext
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isCombineEnabled={true}
            >
              <ScrollContainer style={{scrollContainerStyle}}>
              <Droppable droppableId="droppable" isCombineEnabled>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >

                    {words.map(elem => {
                      return (
                        <Draggable key={elem.id} draggableId={elem.val+elem.id} index={elem.id} >
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
                              {elem.val}
                              <br />
                              <button value={elem.val} onClick={handleWordClick} >Translate</button>
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
          <button onClick={handleBack}>Back</button>
        </Card.Body>
      </Card>
    );
  }
}
 
export default Left;