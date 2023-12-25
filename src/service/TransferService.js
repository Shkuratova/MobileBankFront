import $api from "../http";
import {API} from "../http/path";

export default class TransferService {
    static async Transfer(amount, from, to, description, cardFrom, cardTo){
            return $api.post(API +'transfer_money/',{
                amount_money:amount,
                account_send: from,
                account_recv:to,
                card_number_send:cardFrom,
                card_number_recv:cardTo,
                description:description
            })
    }
    static async confirmTransfer(tfa, code){
        return $api.put(API+'transfer_money/', {
            tfa_token:tfa,
            confirm_code:code
        })
    }
    static async isClient(account){
        return $api.get(API + 'has_account/', {params:{
                account_number:account
            }
        })
    }
}
