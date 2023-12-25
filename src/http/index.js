import axios from "axios";
import async from "async";



const $api = axios.create({
    withCredentials:true
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization =localStorage.getItem('token')
    return config;
})
$api.interceptors.response.use((congig)=>{
    return congig;
},async (error)=>{
    const request = error.config;
    if(error.response.status == 403) {
        const response = await axios.post('/auth/update_api_tokens/',
            {refresh_token:localStorage.getItem('refresh')},
            {withCredentials: true})
        localStorage.setItem('token', response.data.access_token);
        return $api.request(request);
    }
    else  {
        return Promise.reject(error)
    }
    })

export default $api;