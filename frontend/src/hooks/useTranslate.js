import { useState, useEffect } from 'react';

const useTranslate = (word, source="en", target="de") => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState("Unable to get translation");

  /*
  useEffect (() => {

    fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-rapidapi-key": "c07e2c5e08mshd3c51cf8cbe266dp1236c9jsn787baf24bd93",
        "x-rapidapi-host": "deep-translate1.p.rapidapi.com"
      },
      "body": JSON.stringify({
        "q": word,
        "source": source,
        "target": target
      })
    })
    .then(res => {
      if (!res.ok) { 
        throw Error('could not fetch the data for that resource');
      } 
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setData(data.data.translations.translatedText)
      setError(null);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted')
      } else {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      }
    })
  }, [word, source, target])
  */
  console.log("Word: ", word) 
  useEffect(() => {
    setData( "Translation when Tania is saving money")
  }, [word]);

  return { data, isPending, error };
}




export default useTranslate;