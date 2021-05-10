import { useState, useEffect, useContext } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Left from "./Left";
import Right from "./Right";
import django_host from "./paths";
//import useTranslate from "../hooks/useTranslate"
import UserContext from "../contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";

const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

const keys = ["front", "back", "user", "deck"];

const languages = ["English", "German", "French", "Spanish", 
                  "Russian", "Slovak", "Polish", "Ukrainian", 
                  "Czech", "Croatian", "Dutch", "Chinese (simplified)", "Greek", 
                  "Hebrew" , "Hungarian", "Italian", "Romanian", "Sweedish", "Turkish"
                ]

const languageCodes = ["en", "de", "fr", "es", "ru", "sk", "pl", 
                      "uk", "cs", "hr", "nl", "zh-CN", "el", "iw", "hu",
                      "it", "ro", "sv", "tr"
                    ]

const languageOptions = languages.map((lan, index) => (
  <option value={languageCodes[index]}>{lan}</option>
));

function toObject(arr, keys) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) rv[keys[i]] = arr[i];
  return rv;
}

const Home = () => {

  if (!("decksNames" in localStorage)) {
    localStorage.setItem("decksNames", "");
    localStorage.setItem("decksIds", "");
  }

  const { username: user } = useContext(UserContext);

  const history = useHistory();
  const [parsed, setParse] = useState(false);
  const [text, setText] = useState("");
  const [queue, setQueue] = useState({});
  const [add, setAdd] = useState({});
  const [back, setBack] = useState(false);
  const [deck, setDeck] = useState(null);
  const [sourceLan, setSourceLan] = useState("en");
  const [targetLan, setTargetLan] = useState("sk");
  const [success, setSuccess] = useState(false);
  
  const decksNames = localStorage.getItem("decksNames").split(",");
  const decksIds = localStorage.getItem("decksIds").split(",");
  const zipped = zip(decksIds, decksNames);

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      history.push("/");
      setParse(false);
      setBack(false);
    });
  });

  useEffect(() => {
    setParse(false)
    setText("")
    setQueue({})
    setAdd({})
    setDeck(null)
    setSuccess(false)
  }, [user]);

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
    setAdd({})
  };

  const handlePostCards = (e) => {
    e.preventDefault();
    const postData = Object.keys(add).map((key) =>
      toObject([key, add[key], user, deck], keys)
    );
    postData.forEach((element) => {
      fetch(django_host + "api/cards/", {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "Content-Type": 'application/json; charset="utf-8"',
        },
        body: JSON.stringify(element),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {})
        .catch((err) => {
          console.log(err.message);
        });
    });
    setSuccess(true)
    setTimeout(function () {
      setDeck(null);
      setParse(false);
      setText("");
      setQueue({});
      setAdd({});
      setDeck(null);
      setSuccess(false)
    }, 2000);
    
    
  };

  const handleWordClick = (e) => {
    if (e.target.value in queue) {
      const { [e.target.value]: tmp, ...rest } = queue;
      setQueue(rest);
    } else {
      const source = sourceLan;
      const target = targetLan;
      fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2", {
        method: "POST",
        headers: {
          "content-type": 'application/json; charset="utf-8"',
          "x-rapidapi-key":
            "c07e2c5e08mshd3c51cf8cbe266dp1236c9jsn787baf24bd93",
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        },
        body: JSON.stringify({
          q: e.target.value,
          source: source,
          target: target,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setQueue({
            ...queue,
            [e.target.value]: data.data.translations.translatedText,
          });
        })
        .catch((err) => {
          setQueue({ ...queue, [e.target.value]: "Falied to translate" });
          console.log(err.message);
        });

      /*setQueue({
        ...queue,
        [e.target.value]: "Translation when saving api resources",
      });*/
    }
  };

  function makeSelectDeck(defDeck) {
    if (zipped !== undefined) {
      return zipped.map((deck) => {
        return (
          <option value={deck[0]} key={deck[0]}>
            {deck[1]}
          </option>
        );
      });
    }
  }

  const handleAdd = (e) => {
    if (e.target.value in add) {
      const { [e.target.value]: tmp, ...rest } = add;
      setAdd(rest);
    } else {
      setAdd({ ...add, [e.target.value]: queue[[e.target.value]] });
    }
  };
  /*
  if (Object.keys(add).length !== 0) {
    const postData = Object.keys(add).map(key => 
      toObject([key, add[key], user, deck], keys)
    )
    console.log(JSON.stringify(postData))
  } else {
    console.log("empty")
  }
 */

  return (
    <div className="home">
      
      <Container>
        <Row style={{ justifyContent: "center", textAlign: "center"}} >
          <h2 >Welcome to Vocs!</h2>
          {!user ? 
          <div>
          <p >
            To start using the app, enter your text on the left. 
            Don't forget to select your target and source languages. 
            Click <strong>Parse</strong> to have your text parsed. Then
            Select the words you are interested in. Click <strong>Translate </strong> 
            to see the translation on the right.
          </p>
          <p>
            Registered users can save their card and revise them later.
          </p>
          </div>
          : <p></p>
          }
        </Row>
        <br /><br />
        <Row>
          <Col>
            <label>Source Language:</label>
            <select
              onChange={(e) => setSourceLan(e.target.value)}
              defaultValue="en"
            >
              {languageOptions}
            </select>
          </Col>
          <Col>
            <label>Target Language:</label>
            <select
              onChange={(e) => setTargetLan(e.target.value)}
              defaultValue="sk"
            >
              {languageOptions}
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
        {Object.keys(add).length !== 0 ? (
          <Row>
            <Col>
              Add Cards to
              <select
                name="deck"
                onChange={(e) => setDeck(e.target.value)}
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
            <Col>
              {!deck ? (
                <h5>Please, select deck to add the cards</h5>
              ) : (
                success ?
                <Alert variant="success">
                  Cards have been successfully added!
                </Alert>
                :
                <button onClick={(e) => handlePostCards(e)}>Add cards</button>
              )}
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
};

export default Home;
