import { useState, useContext, useEffect, useMemo } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Left from "./Left";
import Right from "./Right";
//import useTranslate from "../hooks/useTranslate"
//import UserContext from "../contexts/UserContext"

const Home = () => {
  //Destructure context
  //    const { user } = useContext(UserContext)

  const history = useHistory();
  const [parsed, setParse] = useState(false);
  const [text, setText] = useState("");
  const [queue, setQueue] = useState({});
  const [add, setAdd] = useState({});
  const [back, setBack] = useState(false);
  const [sourceLan, setSourceLan] = useState("en");
  const [targetLan, setTargetLan] = useState("sk");

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      history.push("/");
      setParse(false);
      setBack(false);
    });
  });

  const handleParse = (e) => {
    setBack(false);
    setParse(true);
    history.push("/");
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleBack = (e) => {
    setBack(true);
    setParse(false);
  };

  const handleWordClick = (e) => {
    if (e.target.value in queue) {
      const { [e.target.value]: tmp, ...rest } = queue;
      setQueue(rest);
    } else {
      /*
            const source=sourceLan
            const target=targetLan
            fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2", {
                "method": "POST",
                "headers": {
                  "content-type": "application/json",
                  "x-rapidapi-key": "c07e2c5e08mshd3c51cf8cbe266dp1236c9jsn787baf24bd93",
                  "x-rapidapi-host": "deep-translate1.p.rapidapi.com"
                },
                "body": JSON.stringify({
                  "q": e.target.value,
                  "source": source,
                  "target": target
                })
              })
              .then(res => res.json())
              .then(data => {
                setQueue({ ...queue, [e.target.value]: data.data.translations.translatedText})
              })
              .catch(err => {
                setQueue({ ...queue, [e.target.value]: "Falied to translate"})
                console.log(err.message)
              })
            */
      setQueue({
        ...queue,
        [e.target.value]: "Translation when saving api resources",
      });
    }
  };

  const handleAdd = (e) => {
    if (e.target.value in add) {
      const { [e.target.value]: tmp, ...rest } = add;
      setAdd(rest);
    } else {
      setAdd({ ...add, [e.target.value]: queue[[e.target.value]] });
    }
  };

  return (
    <div className="home">
      <h2>Home</h2>
      <br />
      <Container>
        <Row>
          <Col>
            <label>Source Language:</label>
            <select
              onChange={(e) => setSourceLan(e.target.value)}
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="de">German</option>
              <option value="ru">Russian</option>
              <option value="sk">Slovak</option>
            </select>
          </Col>
          <Col>
            <label>Target Language:</label>
            <select
              onChange={(e) => setTargetLan(e.target.value)}
              defaultValue="sk"
            >
              <option value="en">English</option>
              <option value="de">German</option>
              <option value="ru">Russian</option>
              <option value="sk">Slovak</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Left
              text={text}
              parsed={parsed}
              handleParse={handleParse}
              handleText={handleText}
              queue={queue}
              handleWordClick={handleWordClick}
              back={back}
              handleBack={handleBack}
            />
          </Col>
          <Col>
            <Right
              parsed={parsed}
              queue={queue}
              handleAdd={handleAdd}
              add={add}
            />
          </Col>
        </Row>
        {
            add.length ? 
            <Row>
                <button>Add Cards to </button>
            </Row>
            :
            <div></div>
        }
        
      </Container>
    </div>
  );
};

export default Home;
