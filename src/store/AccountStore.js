import {makeAutoObservable, runInAction} from "mobx";
import CardService from "../service/CardService";

class AccountStore {
    bills = [];
    bill =''
    debit =[];
    credit = [];

    billExcept =[]
    billTo = ''

    isLoad = false;
    error = null;

    constructor() {
        makeAutoObservable(this)
    }

    getAccounts = async () =>{
        try {
            this.isLoad = true
            const response = await CardService.accountsList();
            runInAction(()=>{
                this.bills = response.data;
                this.debit = response.data.filter((c)=>c.type_account==='debit')
                this.credit = response.data.filter((c)=>c.type_account==='credit')
                this.bill = this.bills[0].account_number
                this.billExcept = this.bills.filter((c)=>c.account_number !==this.bill);
                this.billTo = this.billExcept[0].account_number
                this.isLoad = false
            })
        } catch (e) {
            this.error = e.message
            this.isLoad = false
        }
    }

    changeBill(e) {
        this.bill = e;
    }

    changeBillExcept = (e) => {
        this.bill = e;
        this.billExcept = this.bills.filter((c) => c.account_number !== e);
        if (e === this.billTo) {
            this.billTo = this.billExcept[0].account_number;
        }
    }
    changeBillTo=(e)=>{
        this.billTo = e;
    }
}
export default new AccountStore();