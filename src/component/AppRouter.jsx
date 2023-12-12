import React, {useContext} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./router";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
        isAuth?
       <Routes>
           {privateRoutes.map(route=>
           <Route
               path={route.path}
               element={route.component}
               key = {route.path}/>
           )}
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

export default AppRouter;