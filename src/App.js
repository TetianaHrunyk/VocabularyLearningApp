import {useState} from "react"
import Navbar from './components/Navbbar'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className="content">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
