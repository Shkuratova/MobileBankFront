import Home from "../pages/Home/Home";
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
import TransferUser from "../pages/CardAbility/Payment/TransferUser";
import Payment from "../pages/CardAbility/Payment/Payment";
import TransferBetween from "../pages/CardAbility/Payment/TransferBetween";
import ChangePassword from "../pages/LK/PersonAbility/ChangePassword";
import SessionHistory from "../pages/LK/PersonAbility/SessionHistory";
import ChangeLogin from "../pages/LK/PersonAbility/ChangeLogin";
import Auth from "../pages/Auth/Auth";
import {ATMS, BILL, CARD, CREDIT, CURRENCY, HISTORY, HOME, PAY, USER} from "../../utils/consts";
import PayService from "../pages/CardAbility/Payment/PayService";
import ValutaCourse from "../Valuta/ValutaCourse";
import BuyValute from "../Valuta/CurerncyExchange/ExchangeValute";
import RegForm from "../pages/Auth/RegForm";
import CreateBill from "../pages/Home/OpenBill/CreateBill";
import CreateCard from "../pages/Home/OpenBill/CreateCard";
import YandexMap from "../Maps/YandexMap";
import NewAccount from "../pages/Home/OpenBill/NewAccount";


export const privateRoutes=[
 //   {path:HOME, component:<Home/>},
    {path:"/*", component:<NewAccount/>},
    {path:'/user/:login', component: <LK/>},
    {path:CURRENCY, component: <ValutaCourse/>},
    {path:ATMS, component: <YandexMap/>},
    {path: CARD+'/:id', component: <CardById/>},
    {path:CREDIT+'/info/:id', component: <CreditInfo/>},
    {path:BILL+'/:id', component: <BillById/>},
    {path:CREDIT+'/:id', component: <CreditById/>},
    {path:CARD+HISTORY+'/:account_number/:token_card', component: <CardHistory/>},
    {path:BILL+HISTORY+'/:account_number/', component: <CardHistory/>},
    {path:CREDIT+HISTORY+'/:account_number/', component: <CardHistory/>},
    {path:PAY+'/transfer/between', component: <TransferBetween/>},
    {path:PAY+'/service', component: <PayService/>},
    {path:PAY+'/transfer/user', component: <TransferUser/>},
    {path:PAY, component: <Payment/>},
    {path:CARD+'/block/:id', component: <Block/>},
    {path:CARD+'/rename/:id', component: <RenameCard/>},
    {path:'/editpassword', component: <ChangePassword/>},
    {path:'/editlogin', component:<ChangeLogin/>},
    {path:'/lastlogin', component: <SessionHistory/>},
    {path:'/about', component: <About/>},
    {path:'/buyvalute/:charcode', component: <BuyValute/>},
    {path:'/new_bill', component: <CreateBill/>},
    {path:'/new_card', component: <CreateCard/>},
    {path:'/buyvalute/:code', component: <BuyValute/>}
]

export const publicRoutes=[
    {path:'/*', component:<Auth/>},
    {path: '/registration', component: <RegForm/>},
    {path:ATMS, component: <YandexMap/>},
    {path:CURRENCY, component: <ValutaCourse/>}
]