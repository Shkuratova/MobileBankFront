import $api from "../http";
import {API} from "../http/path";

export default class CardService{
    static async cardList() {
        return $api.get(API +'get_cards/')
    }
    static async accountsList(type){
        const response = await  $api.get(API+'get_accounts/',
        { params:{
            type_account:type
            }
        })
        return response
    }
}