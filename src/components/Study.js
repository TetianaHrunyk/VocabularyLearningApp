 /*eslint-disable eqeqeq*/
import { useState, useEffect, useContext} from "react";
import Card from "react-bootstrap/Card";
import django_host from "./paths";
import UserContext from "../contexts/UserContext.js";
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
  //eslint-disable-next-line
  const { username: user } = useContext(UserContext);
  const [curId, setCurId] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const decksNames = localStorage.getItem("decksNames").split(",");
  const decksIds = localStorage.getItem("decksIds").split(",");
  const zipped = zip(decksIds, decksNames);
  const [loading, setLoading] = useState(false);

//  console.log("CurId: ", curId)
//  console.log("Hist: ", hist)
//  console.log("Indices: ", indices)
  useEffect(() => {
//    console.log("Fetch data")
    setLoading(true)
    const d = deck || "0000000000000000000000000"
    fetch(django_host + "api/study/?deck="+d+"&progress=0.5", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.statusText === "Internal Server Error") {
          throw new Error('Deck not selected')
          
        } else {
          return response.json()
        }
      })
      .then((data) => {
        setData(data);
        setIndices(Object.keys(data));
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        error.message !== 'Deck not selected' ?
        setApiError(error) : setApiError('')
        setLoading(false)
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

  const handleGotIt = (e) => {
    const requestData = {
      "front": data[curId].front,
      "back": data[curId].back,
      "for_nat": data[curId].for_nat+0.06,
       user, deck
    }
    fetch(django_host + "api/cards/"+data[curId].id+'/', {
      method: "PUT",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
    setIndices(indices.filter((elem) => elem !== curId));
    setHist(hist.filter((elem) => elem !== curId));
    indices.length > 1
      ? setCurId(get_random(indices.filter((elem) => elem !== curId)))
      : setCurId(curId);
    setShowAnswer(false);
  };

  const handleAskLater = (e) => {
    const requestData = {
      "front": data[curId].front,
      "back": data[curId].back,
      "for_nat": data[curId].for_nat-0.05,
       user, deck
    }
    fetch(django_host + "api/cards/"+data[curId].id+'/', {
      method: "PUT",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
    setShowAnswer(false);
    setHist([...hist, curId]);
    indices.length > 1
      ? setCurId(get_random(indices.filter((elem) => elem !== curId)))
      : setCurId(curId);
  };

  return (
    <div>
      <h2>
        {deck
          ? "Study cards in " + zipped.filter((elem) => elem[0] == deck)[0][1]
          : "Select deck"
        }
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
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setShowAnswer(false);
                  setCurId(hist[hist.length - 1]);
                  setHist(hist.slice(0, hist.length-1))
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
                    <button
                      onClick={(e) => {
                        setShowAnswer(true);
                      }}
                    >
                      Show answer
                    </button>
                  ) : (
                    <>
                      Answer: <strong>{data[curId].back}</strong>
                      <br />
                      <button
                        onClick={(e) => handleGotIt(e)}
                      >
                        Got it
                      </button>
                      <button
                        onClick={(e) => handleAskLater(e)}
                      >
                        Ask later
                      </button>
                    </>
                  )}
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
                style={{
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setShowAnswer(false);
                  setHist([...hist, curId]);
                  indices.length > 1
                    ? setCurId(
                        get_random(indices.filter((elem) => elem !== curId))
                      )
                    : setCurId(curId);
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
        loading ? <h4><br />Loading...</h4>
        :
        <Alert variant="success">
          Great job! No cards to study in this deck. Try another one.
        </Alert>
      )}
    </div>
  );
};
 
export default Study;