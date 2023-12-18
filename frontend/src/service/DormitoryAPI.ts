import axiosInstance from "./axiosInstance";

export default class DormitoryAPI {
    constructor() { }
    static gets() {
        return axiosInstance.get("/getDormitory")
    }
    static getsByBuildingId(buildingId: string) {
        const data = { "buildingId": buildingId }
        return axiosInstance.get(`/getDormitory?${new URLSearchParams(data).toString()}`)
    }
}
