import axiosInstance from "./axiosInstance";

export default class BuildingAPI {
    constructor() { }

    static async gets() {
        try {
            return (await axiosInstance.get("/getDepartments")).data
        } catch (error) {
            console.log(error)
        }
    }
    static async getPage(limit: number, offset: number) {
        try {
            const data = { "limit": String(limit), "offset": String(offset) }
            return (await axiosInstance.get(`/getDepartments?${new URLSearchParams(data).toString()}`)).data
        } catch (error) {
            console.log(error)
        }
    }

    static async getCount() {
        try {
            return (await axiosInstance.get("/getDepartmentCount")).data
        } catch (error) {
            console.log(error)
        }
    }

    static async add(name: string) {

    }

    static async update(id: string, name: string) {

    }
}
