import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./router";
import {observer} from "mobx-react-lite";
import PersonStore from "../store/PersonStore";
import ValutaStore from "../store/ValutaStore";
import Home from "./pages/Home/Home";
import LK from "./pages/LK/LK";
import {HOME} from "../utils/consts";
import NewAccount from "./pages/Home/OpenBill/NewAccount";

const AppRouter = () => {
    const {isAuth, checkAuth} = PersonStore;
    const {getCourse}= ValutaStore
    useEffect(() => {
        if(localStorage.getItem('token')){
            checkAuth()
        }
    }, []);

    return (
        isAuth?
       <Routes>
           <Route path={'/'} element={<Home/>}>
           {privateRoutes.map(route=>
           <Route
               path={route.path}
               element={route.component}
               key = {route.path}/>
           )}
           </Route>
       </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                <Route
                    path={route.path}
                    element={route.component}
                    key={route.path}/>
                )}
            </Routes>
    );
};

export default observer(AppRouter);