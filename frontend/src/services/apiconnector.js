import axios from "axios";

export const axiosinstance = axios.create({});

export const apiconnector = (method,url,body,header,parameters)=>{

    return axiosinstance({

        method:method,
        url:url,
        data:body ? body : null,
        headers:header ? header : {'Content-Type':'application/json'},
        params:parameters ? parameters : null
    })

}