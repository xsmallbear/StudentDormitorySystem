import axiosInstance from "./axiosInstance";

export default class DormitoryAPI {
    constructor() { }
    static async gets() {
        return axiosInstance.get("/getDormitory")
    }
    static async getsByBuildingId(buildingId: string) {
        try {
            const data = { "buildingId": buildingId }
            return (await axiosInstance.get(`/getDormitory?${new URLSearchParams(data).toString()}`)).data
        } catch (error) {
            console.log(error)
        }
    }
}
