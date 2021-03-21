import './App.css';
import Navbar from './components/Navbbar'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Navbar isLoggedIn=""/>
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
