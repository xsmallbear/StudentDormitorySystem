export default interface Manager {
    managerId: string
    managerUsername: string;
    managerPasswordHash: string;
    managerSalt: string;
    createTime: string;
}