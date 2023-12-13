import axiosInstance from "./axiosInstance";

export default class BuildingAPI {
    constructor() { }
    static gets() {
        return axiosInstance.get("/getBuildings")
    }
}
