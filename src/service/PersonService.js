import $api from "../http";
import {API} from "../http/path";

export default class PersonService{
    static async personInfo(){
        return await $api.get(API+'user_info/')
    }
}