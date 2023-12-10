import Manager from "../types/Manager";
import { faker } from '@faker-js/faker';

const fakeManager = (): Manager => {
    return {
        id: faker.string.uuid(),
        username: faker.internet.displayName(),
        passwordHash: faker.internet.password(),
        salt: faker.internet.password(),
        createTime: new Date().toString()
    }
}

export default fakeManager