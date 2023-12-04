import Home from "../pages/Home/Home";
import Payment from "../pages/Payment";
import ValuteCourse from "../pages/ValuteCourse";
import Bankomats from "../pages/Bankomats";
import LK from "../pages/LK";
export const privateRoutes=[
    {path:"/home", component:<Home/>},
    {path:'/pay', component: <Payment/>},
    {path:':login', component: <LK/>},
    {path:'/valute', component: <ValuteCourse/>},
    {path:'/bankomats', component: <Bankomats/>}
]