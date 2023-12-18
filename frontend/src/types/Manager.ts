export default interface Manager {
    id: string
    username: string
    passwordHash: string
    salt: string
    createTime: Date
    updateTime: Date
}