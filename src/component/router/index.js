import Home from "../pages/Home/Home";
import ValuteCourse from "../pages/ValuteCourse";
import Bankomats from "../pages/Bankomats";
import LK from "../pages/LK/LK";
import CardById from "../pages/GetItemById/CardById";
import CardHistory from "../pages/CardAbility/history/CardHistory";
import Block from "../pages/CardAbility/Block";
import RenameCard from "../pages/CardAbility/RenameCard";
import ChangePassword from "../pages/PersonAbility/ChangePassword";
import ChangeLogin from "../pages/PersonAbility/ChangeLogin";
import SessionHistory from "../pages/PersonAbility/SessionHistory";
import About from "../pages/About";
import BillById from "../pages/GetItemById/BillById";
import CreditById from "../pages/GetItemById/CreditById";
import CreditInfo from "../pages/CardAbility/CreditInfo";
import ToOther from "../pages/CardAbility/Payment/toOther";
import Payment from "../pages/CardAbility/Payment/Payment";
import ToSelf from "../pages/CardAbility/Payment/toSelf";

export const privateRoutes=[
    {path:"/home", component:<Home/>},
    {path:"/*", component:<Home/>},
    {path:'/user/:login', component: <LK/>},
    {path:'/valute', component: <ValuteCourse/>},
    {path:'/bankomats', component: <Bankomats/>},
    {path:'/cards/:id', component: <CardById/>},
    {path:'/credit/info/:id', component: <CreditInfo/>},
    {path:'/bill/:id', component: <BillById/>},
    {path:'/credit/:id', component: <CreditById/>},
    {path:'/card/history/:id', component: <CardHistory/>},
    {path:'/credit/history/:id', component: <CardHistory/>},
    {path:'/payment/toSelf', component: <ToSelf/>},
    {path:'/payment/toOther', component: <ToOther/>},
    {path:'/payment', component: <Payment/>},
    {path:'/card/block/:id', component: <Block/>},
    {path:'/card/rename/:id', component: <RenameCard/>},
    {path:'/editpassword/:login', component: <ChangePassword/>},
    {path:'/editlogin/:login', component:<ChangeLogin/>},
    {path:'/lastlogin/:login', component: <SessionHistory/>},
    {path:'/about', component: <About/>}
]