import Manager from "../types/Manager";
import Student from "../types/Student";
import { faker } from '@faker-js/faker';

const fakeManager = (): Manager => {
    return {
        managerId: faker.string.uuid(),
        managerUsername: faker.internet.displayName(),
        managerPasswordHash: faker.internet.password(),
        managerSalt: faker.internet.password(),
        createTime: new Date().toString()
    }
}

export default fakeManager