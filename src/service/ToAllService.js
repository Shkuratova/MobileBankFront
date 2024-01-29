import axios from "axios";
import {API} from "../http/path";
import $all from "../http/all";

export default class ToAllService{
    static async getValuta(){
        return await $all.get(API + 'get_currencies/')
    }
    static async gerCoords(){
        return await $all.get(API+'get_atm/')
    }

}