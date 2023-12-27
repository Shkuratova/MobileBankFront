import axios from "axios";

export default class ToAllService{
    static async getValuta(){
        return await axios.get("/api/v1/get_currencies/")
    }
}