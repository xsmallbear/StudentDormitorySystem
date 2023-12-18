import axiosInstance from "./axiosInstance";

export default class LoginAPI {
    static login(userName: string, password: string) {
        return axiosInstance.post("/login", { userName: userName, password: password })
    }

}
