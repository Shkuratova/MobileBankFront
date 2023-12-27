import axios from "axios";

export default class AuthService{
    static async registration(account, login,  password, re_password ){
        return axios.post('/auth/registration/', {account, login, password, re_password})
    }
    static async login(login,  password){
        return axios.post('/auth/', {login, password})
    }
 
    static async has_acc(account){
        return axios.get(`/api/v1/has_account/`, {
            params:{
                account_number:account
            }
        })
    }
    static async confirmation(tfa_token, confirm_code){
        return axios.put('/auth/', {
            tfa_token:tfa_token,
            confirm_code:confirm_code
        })
    }
    static async confirmRegistration(tfa, code){
        return axios.put('/auth/registration/',{
            tfa_token:tfa,
            confirm_code:code
        })
    }
    static async refreshToken(){

    }
}