import Building from "../types/Building";
import axiosInstance from "./axiosInstance";

export default class BuildingAPI {
    constructor() { }
    static gets() {
        return axiosInstance.get("/getBuildings")
    }
    static getCount() {
        return axiosInstance.get("/getBuildingCount")
    }
    static add(name: string) {
        return axiosInstance.post("/addBuilding", { newBuildingName: name })
    }
    static update(id: string, name: string) {
        return axiosInstance.post("/updateBuilding", { id: id, name: name })
    }
}
