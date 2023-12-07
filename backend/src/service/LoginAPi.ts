import apiAxios from "./apiAxios";

export default class LoginApi {
    axios = apiAxios 
    constructor() { }
    static login(userName: string, password: string) {
        return apiAxios.post("/login", {userName:userName, password:password})
    }

}
