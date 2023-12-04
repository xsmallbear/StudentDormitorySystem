import Student from "../types/Student";
import { faker } from '@faker-js/faker';

const fakeStudents = (): Student => {
    return {
        id: faker.string.uuid(),
        name: faker.person.firstName() + faker.person.lastName(),
        dormitoryId: 0,
        departmentId: 0
    }
}

export default fakeStudents