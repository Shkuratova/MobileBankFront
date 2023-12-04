import './component/styles/App.css';
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/pages/Home/Home";
import CardItem from "./component/pages/Home/CardItem";
import CardList from "./component/pages/Home/CardList";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Home/>
    </div>
  );
}

export default App;
