import './component/styles/App.css';
import Navbar from "./component/Navbar/Navbar";
import AppRouter from "./component/AppRouter";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <AppRouter/>
    </div>
  );
}

export default App;
