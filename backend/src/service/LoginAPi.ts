import instance from "./apiAxios";

export default class LoginApi {
    axios = instance 
    constructor() { }
    static login(userName: string, password: string) {
        return instance.post("/login", {userName:userName, password:password})
    }

}
