import ToAllService from "../service/ToAllService";
import {action, makeAutoObservable, observable, runInAction} from "mobx";

class CurrencyStore{
    course =[]
    val = null
    isLoad = false
    setCourse = (a)=>{
        this.course = a;
    }
    setVal = (charCode)=>{
        console.log("CNHJRF", charCode)
        this.val = charCode;
    }
    setIsLoad = (b)=>{
        this.isLoad = b;
    }
    constructor() {
        makeAutoObservable(this, {
            course:observable,
            val:observable,
            isLoad:observable,
            setCourse:action,
            setIsLoad:action,
            setVal:action
        })
    }
    getCourse = async ()=>{
        try {
            this.setIsLoad(true)
            const response = await ToAllService.getValuta()
            runInAction(()=>{
                this.setCourse(response.data)
                this.setIsLoad(false)
            })

        }catch (e){
            console.log(e.response.data)
            this.setIsLoad(false)
        }
    }
}
export default new CurrencyStore()