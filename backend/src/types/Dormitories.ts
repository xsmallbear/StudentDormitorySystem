export default interface Dormitories {
    id: string
    type: 'Male' | 'Female' | 'Mixed'
    buildingId: string
    rootNumber: string
    floor: number
    status: 'Vacant' | 'Occupied' | 'Under maintenance'
    createTime: Date
    updateTime: Date
}