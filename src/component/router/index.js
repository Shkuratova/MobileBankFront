import Home from "../pages/Home/Home";
import ValutaCourse from "../pages/ValutaCourse";
import ATM from "../pages/Other/ATM";
import LK from "../pages/LK/LK";
import CardById from "../pages/GetItemById/CardById";
import CardHistory from "../pages/CardAbility/history/CardHistory";
import Block from "../pages/CardAbility/Block";
import RenameCard from "../pages/CardAbility/RenameCard";
import About from "../pages/Other/About";
import BillById from "../pages/GetItemById/BillById";
import CreditById from "../pages/GetItemById/CreditById";
import CreditInfo from "../pages/CardAbility/CreditInfo";
import ToOther from "../pages/CardAbility/Payment/toOther";
import Payment from "../pages/CardAbility/Payment/Payment";
import ToSelf from "../pages/CardAbility/Payment/toSelf";
import ChangePassword from "../pages/LK/PersonAbility/ChangePassword";
import SessionHistory from "../pages/LK/PersonAbility/SessionHistory";
import ChangeLogin from "../pages/LK/PersonAbility/ChangeLogin";
import Auth from "../pages/Auth/Auth";
import {ATMS, BILL, CARD, CREDIT, CURRENCY, HISTORY, HOME, PAY, USER} from "../utils/consts";
import PayService from "../pages/CardAbility/Payment/PayService";

export const privateRoutes=[
    {path:HOME, component:<Home/>},
    {path:"/*", component:<Home/>},
    {path:USER + '/:login', component: <LK/>},
    {path:CURRENCY, component: <ValutaCourse/>},
    {path:ATMS, component: <ATM/>},
    {path: CARD+'/:id', component: <CardById/>},
    {path:CREDIT+'/info/:id', component: <CreditInfo/>},
    {path:BILL+'/:id', component: <BillById/>},
    {path:CREDIT+'/:id', component: <CreditById/>},
    {path:CARD+HISTORY+'/:id', component: <CardHistory/>},
    {path:CREDIT+HISTORY+'/:id', component: <CardHistory/>},
    {path:PAY+'/toSelf', component: <ToSelf/>},
    {path:PAY+'/service', component: <PayService/>},
    {path:PAY+'/toOther', component: <ToOther/>},
    {path:PAY, component: <Payment/>},
    {path:CARD+'/block/:id', component: <Block/>},
    {path:CARD+'/rename/:id', component: <RenameCard/>},
    {path:'/editpassword/:login', component: <ChangePassword/>},
    {path:'/editlogin/:login', component:<ChangeLogin/>},
    {path:'/lastlogin/:login', component: <SessionHistory/>},
    {path:'/about', component: <About/>}
]

export const publicRoutes=[
    {path:'/*', component:<Auth/>},
    {path:ATMS, component: <ATM/>}
]