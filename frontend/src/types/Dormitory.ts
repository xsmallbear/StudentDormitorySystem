export default interface Dormitory {
    id: string
    type: 'Male' | 'Female' | 'Mixed'
    buildingId: string
    rootNumber: string
    floor: number
    status: 'Vacant' | 'Occupied' | 'Under maintenance'
    createTime: Date
    updateTime: Date
}