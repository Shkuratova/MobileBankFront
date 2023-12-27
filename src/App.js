import './component/styles/App.css';
import Navbar from "./component/Navbar/Navbar";
import AppRouter from "./component/AppRouter";
import CardList from "./component/pages/Home/CardList";
import {observer} from "mobx-react-lite";

function App() {

  return (

          <div className="App">
              <Navbar/>
              <CardList/>
              <AppRouter/>
          </div>
  );
}

export default observer(App);
