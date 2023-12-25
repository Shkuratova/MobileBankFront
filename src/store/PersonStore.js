import {makeObservable, runInAction} from "mobx";
import PersonService from "../service/PersonService";

class PersonStore{
    person = {firstName:'', lastName:'', thirdName:'',sex:'', email:'', telephone:'', login:'' }
    Load = false

    constructor() {
        makeObservable(this)
    }

    getPersonInfo =  async ()=>{
            try{
                this.Load = true
                const response = await PersonService.personInfo();
                runInAction(()=> {
                    this.person.firstName = response.data.first_name;
                    this.person.lastName = response.data.second_name;
                    this.person.thirdName = response.data.third_name;
                    this.person.sex = response.data.sex;
                    this.person.login = response.data.login;
                    this.person.email = response.data.email;
                    this.person.telephone = response.data.phone_number;
                    this.Load = false
                })
            }catch (e){
                console.log(e.response.data)
                this.Load = false
            }
    }
}
export default new PersonStore();