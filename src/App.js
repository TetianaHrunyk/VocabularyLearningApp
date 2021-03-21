import Navbar from './components/Navbbar'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Navbar isLoggedIn=""/>
      <div className="content">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
