import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes} from "./router";
import Home from "./pages/Home/Home";

const AppRouter = () => {
    return (
       <Routes>
           {privateRoutes.map(route=>
           <Route
               path={route.path}
               element={route.component}
               key = {route.path}/>
           )}
           <Route element={Home}/>
       </Routes>
    );
};

export default AppRouter;