import './component/styles/App.css';
import Navbar from "./component/Navbar/Navbar";
import AppRouter from "./component/AppRouter";
import {AuthContext} from "./context";
import {useState} from "react";
function App() {
    const[isAuth, setIsAuth] = useState(true)
  return (
      <AuthContext.Provider value={{
          isAuth,
          setIsAuth
      }}>
          <div className="App">
              <Navbar/>
              <AppRouter/>
          </div>
      </AuthContext.Provider>
  );
}

export default App;
