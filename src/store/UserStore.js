import {action, makeObservable, observable, runInAction} from "mobx";
import PersonService from "../service/PersonService";
import AuthService from "../service/AuthService";
import axios from "axios";

class UserStore{
    person = {firstName:'', lastName:'', thirdName:'',sex:'', email:'', telephone:'', login:'' }
    Load = false
    isAuth = false
    tfa = ''
    AuthError = null;
    constructor() {

        makeObservable(this, {
            Load:observable,
            isAuth:observable,
            tfa:observable,
            AuthError:observable,
            person:observable,
            setAuth:action,
            setAuthError:action,
            setLoad:action
        })
    }

    setTfa(t){
        this.tfa = t
    }
    setAuth(b){
        this.isAuth = b;
    }
    setLoad(b){
        this.Load = b;
    }
    setAuthError(s){
        this.AuthError = s;
    }
    logout = ()=>{
        this.setAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('ref_token')
    }
    SiqnIn = async (login, pas)=>{
        try{
            const response = await AuthService.login(login, pas)
            this.setTfa(response.data.tfa_token)
            this.setAuthError(null)
        }catch (e) {
            this.setAuthError(e.response)
            console.log(this.AuthError)
        }
    }
    ConfirmLogin = async(code)=>{
        try{
            const response = await AuthService.confirmation(this.tfa, code)
            this.setAuthError(null)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('ref_token', response.data.refresh_token)
            this.setAuth(true)
            console.log(response.data)
        }catch (e) {
            this.setAuthError(e)
        }
    }
    SiqnUp = async (login, pas, rePas)=>{
        try {
            const response = await AuthService.registration(login, pas, rePas);
            this.setTfa(response.data.tfa_token)
            this.setAuthError(null)
            console.log(response.data)
        }catch (e) {
            this.setAuthError(e.response.data)
        }
    }
    ConfirmReg = async(code)=>{
        try {
            const response = await AuthService.confirmRegistration(this.tfa, code)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('ref_token', response.data.refresh_token)
            console.log(response.data)
            this.setAuth(true)
            this.setAuthError(null)
        }catch (e) {
            this.setAuthError(e.response.data)
            console.log(e.response.data)
        }
    }
    checkAuth = async ()=>{
        this.setLoad(true);
        try {
            const response =  await axios.post('/auth/update_api_tokens/',
                {refresh_token:localStorage.getItem('ref_token')},
                {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('ref_token', response.data.refresh_token)
            this.setAuth(true)
        }catch (e) {
            console.log(e.response.data)
        }
        finally {
            this.setLoad(false);
        }
    }

    getPersonInfo =  async ()=>{
            try{
                this.setLoad(true);
                const response = await PersonService.personInfo();
                runInAction(()=> {
                    this.person.firstName = response.data.first_name;
                    this.person.lastName = response.data.second_name;
                    this.person.thirdName = response.data.third_name;
                    this.person.sex = response.data.sex;
                    this.person.login = response.data.login;
                    this.person.email = response.data.email;
                    this.person.telephone = response.data.phone_number;
                    this.setLoad(false)
                })
            }catch (e){
                console.log(e.response.data)
                this.setLoad(false);
            }
    }
}
export default new UserStore();