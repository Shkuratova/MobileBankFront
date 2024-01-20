import React, {useState} from 'react';
import "../../styles/Common.css"
import CardList from "./CardList";
import Action from "../../UI/Action";
import '../../styles/App.css'
import './Home.css'
import {Outlet} from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
const Home = () => {

    return (
        <div className="App">
                <Navbar/>
            <div className="page_char">
                <CardList/>
                <Outlet/>
            </div>



        </div>
    );
};

export default Home;