import { useState, useEffect, useContext} from "react";
import Card from "react-bootstrap/Card";
import django_host from "./paths";
import UserContext from "../contexts/UserContext.js";
import useGetData from "../hooks/useGetData";
import { Row, Col } from "react-bootstrap";
import {useLocation} from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

const get_random = function (list) {
  return list[Math.floor((Math.random()*list.length))];
} 

const Study = () => {
  let locationData = useLocation();

  const [deck, setDeck] = useState(locationData.state?.deckId || null);
  const [data, setData] = useState([]);
  const [indices, setIndices] = useState([]);
  const [apiError, setApiError] = useState("");
  const [hist, setHist] = useState([]);
  const { username: user } = useContext(UserContext);
  const [curId, setCurId] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const decksNames = localStorage.getItem("decksNames").split(",");
  const decksIds = localStorage.getItem("decksIds").split(",");
  const zipped = zip(decksIds, decksNames);

//  console.log("CurId: ", curId)
//  console.log("Hist: ", hist)
//  console.log("Indices: ", indices)
  useEffect(() => {
//    console.log("Fetch data")
    fetch(django_host + "api/study/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIndices(Object.keys(data));
      })
      .catch((error) => {
        console.error("Error:", error);
        setApiError(error);
      });
  }, [deck]);

  function makeSelectDeck(defDeck) {
    return zipped.map((deck) => {
      return (
        <option value={deck[0]} key={deck[0]}>
          {deck[1]}
        </option>
      );
    });
  }

  const handleDeck = (e) => {
    setDeck(e.target.value);
  };

  return (
    <div>
      <h2>
        {deck
          ? "Study cards in " + zipped.filter((elem) => elem[0] == deck)[0][1]
          : "Select deck"}
      </h2>
      {apiError !== "" ? <Alert variant="danger"> {apiError} </Alert> : ""}
      <br />
      <Row>
        <Col>
          <h5>Deck: </h5>
          <select
            name="deck"
            onChange={(e) => handleDeck(e)}
            defaultValue={deck ? deck : "-------"}
          >
            {!deck ? (
              <option key="dummy" value="dummy">
                --------
              </option>
            ) : (
              ""
            )}
            {makeSelectDeck(deck)}
          </select>
        </Col>
      </Row>
      {deck == null ? (
        <div></div>
      ) : indices.length ? (
        <Row>
          <Col
            md={{ span: 1, offset: 2 }}
            style={{ alignSelf: "center", justufySelf: "center" }}
          >
            {hist.length ? (
              <span
                className="material-icons"
                style = {{WebkitUserSelect: "none",  
                          MozUserSelect: "none",
                          cursor: "pointer"
                        }}
                onClick={(e) => {
                  setShowAnswer(false);
                  setCurId(hist[hist.length-1])
                }}
              >
                arrow_back_ios
              </span>
            ) : (
              <div></div>
            )}
          </Col>

          <Col>
            <Card style={{ minWidth: "30%" }}>
              <Card.Body>
                <Card.Title>{data[curId].front}</Card.Title>
                <Card.Text>
                  {!showAnswer ? (
                    <button onClick={(e) => {setShowAnswer(true); }}>
                      Show answer
                    </button>
                  ) : (
                    <>
                      Answer: <strong>{data[curId].back}</strong>
                      <br />
                      <button
                        onClick={(e) => {
                          setIndices(indices.filter(elem => elem !== curId))
                          setHist(hist.filter(elem => elem !== curId))
                          setCurId(get_random(indices))
                          setShowAnswer(false);
                        }}
                      >
                        Got it
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      setShowAnswer(false);
                      setHist([...hist, curId])
                      setCurId(get_random(indices))
                    }}
                  >
                    Ask later
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col
            md={{ span: 2, offset: 0 }}
            style={{ alignSelf: "center", justufySelf: "center" }}
          >
            {indices.length ? (
              <span
                className="material-icons"
                style = {{WebkitUserSelect: "none",  
                          MozUserSelect: "none",
                          cursor: "pointer"
                        }}
                onClick={(e) => {
                  setShowAnswer(false);
                  setHist([...hist, curId])
                  setCurId(get_random(indices))
                }}
              >
                arrow_forward_ios
              </span>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      ) : (
        <Alert variant="success">
          Great job! No cards to study in this deck. Try another one.
        </Alert>
      )}
    </div>
  );
};
 
export default Study;