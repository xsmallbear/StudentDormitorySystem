import Building from "../types/Building";
import axiosInstance from "./axiosInstance";

export default class BuildingAPI {
    constructor() { }
    static gets() {
        return axiosInstance.get("/getBuildings")
    }
    static add(name: string) {

    }
    static update(id: string, name: string) {
        return axiosInstance.post("/updateBuilding", { id: id, name: name })
    }
}
