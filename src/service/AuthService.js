import $api from "../http";

export default class AuthService{
    static async registration(account, login,  password, re_password ){
        return $api.post('/auth/registration/', {account, login, password, re_password})
    }
    static async login(login,  password){
        return $api.post('/auth/', {login, password})
    }
 
    static async has_acc(account){
        return $api.get(`/api/v1/has_account/`, {
            params:{
                account_number:account
            }
        })
    }
    static async confirmation(tfa_token, confirm_code){
        return $api.put('/auth/', {tfa_token, confirm_code})
    }
}