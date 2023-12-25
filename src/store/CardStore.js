import {makeAutoObservable, runInAction} from "mobx";
import CardService from "../service/CardService";

class CardStore {
    cards = [];
    card;
    cardExcept = [];
    cardTo;
    isLoading = false;
    cardError = null;
    constructor() {
        makeAutoObservable(this)
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


}
export default new CardStore();