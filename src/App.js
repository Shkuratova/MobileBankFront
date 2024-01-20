import './component/styles/App.css';
import AppRouter from "./component/AppRouter";
import {observer} from "mobx-react-lite";
import CardList from "./component/pages/Home/CardList";
import {Outlet} from "react-router-dom";
import React from "react";
import Navbar from "./component/Navbar/Navbar";


function App() {

  return (
        <AppRouter/>
  );
}

export default observer(App);
