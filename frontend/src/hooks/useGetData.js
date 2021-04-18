import { useState, useEffect } from 'react';

const useFetch = (url, method, authentication, deleted, created) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
      fetch(url, 
        { 
          'signal': abortCont.signal,
          'method': method,
          'headers': {
            Authorization: authentication,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        if (!res.ok) { 
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
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
        console.log(err.message)
      })

    // abort the fetch
    return () => abortCont.abort();
  }, [url, method, authentication, deleted, created])

  return { data, isPending, error };
}
 
export default useFetch;