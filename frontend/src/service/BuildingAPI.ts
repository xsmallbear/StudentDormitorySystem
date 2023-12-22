import axiosInstance from "./axiosInstance";

export default class BuildingAPI {
    constructor() { }

    static async gets() {
        try {
            return (await axiosInstance.get("/getBuildings")).data
        } catch (error) {
            console.log(error)
        }
    }
    static async getPage(limit: number, offset: number) {
        try {
            const data = { "limit": String(limit), "offset": String(offset) }
            return (await axiosInstance.get(`/getBuildings?${new URLSearchParams(data).toString()}`)).data
        } catch (error) {
            console.log(error)
        }
    }

    static async getCount() {
        try {
            return (await axiosInstance.get("/getBuildingCount")).data
        } catch (error) {
            console.log(error)
        }
    }

    static async add(name: string) {
        try {
            return (await axiosInstance.post("/addBuilding", { newBuildingName: name })).data
        } catch (error) {
            console.log(error)
        }
    }

    static async update(id: string, name: string) {
        try {
            return (await axiosInstance.post("/updateBuilding", { id: id, name: name })).data
        } catch (error) {
            console.log(error)
        }
    }
}
