import {makeAutoObservable, observable, runInAction} from "mobx";
import CardService from "../service/CardService";

class CardStore {
    cards = [];
    card;
    isLoading = false;
    cardError = null;
    constructor() {
        makeAutoObservable(this,{
            cards:observable
        }

        )
    }
    getCards = async () =>{
        try {
            this.isLoading = true
            const response = await CardService.cardList();
            runInAction(()=>{
                this.cards = response.data;
                this.card = this.cards[0].token_card
                this.isLoading = false
            })
        } catch (e) {
            this.cardError = e.message
            this.isLoading = false
        }
    }
    getPayCard = ()=>{
        return this.cards.filter((c)=>c.balance >0)
    }

}
export default new CardStore();