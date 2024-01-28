import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./router";
import {observer} from "mobx-react-lite";
import UserStore from "../store/UserStore";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PublicPage from "./pages/Auth/PublicPage";

const AppRouter = () => {
    const {isAuth, checkAuth} = UserStore;
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
                <Route path={'/'} element={<PublicPage/>}>
                <Route index element={<Auth/>}/>
                {publicRoutes.map(route =>
                <Route
                    path={route.path}
                    element={route.component}
                    key={route.path}/>
                )}
                </Route>
            </Routes>
    );
};

export default observer(AppRouter);