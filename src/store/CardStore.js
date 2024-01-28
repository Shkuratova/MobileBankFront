import {action, makeAutoObservable, observable, runInAction} from "mobx";
import CardService from "../service/CardService";

class CardStore {
    cards = [];
    card;
    isLoading = false;
    cardError = null;
    ans = {}
    constructor() {
        makeAutoObservable(this,{
            cards:observable,
            ans:observable,
            card:observable,
            cardError:observable,
            getCards:action
        }

        )
    }
    getCards = async () =>{
        try {
            this.isLoading = true
            const response = await CardService.cardList();
            runInAction(()=>{
                console.log(response.data)
                this.cards = response.data;
                this.card = this.cards[0].token_card
                this.isLoading = false
            })
        } catch (e) {
            this.cardError = e.message
            this.isLoading = false
        }
    }
    newCard = async (account, paySystem)=>{
        try {
            const response = await CardService.openCard(account, paySystem)
            this.ans = response.data
            this.cards.push(response.data)
        }catch (e) {
            this.cardError = e.message
        }
    }
    getPayCard = ()=>{
        return this.cards.filter((c)=>c.balance >0 || c.type_account ==='credit')
    }

}
export default new CardStore();