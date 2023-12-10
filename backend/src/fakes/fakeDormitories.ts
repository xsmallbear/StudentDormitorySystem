import Dormitories from "../types/Dormitories";
import { faker } from '@faker-js/faker';

const fakeDormitories = (): Dormitories => {
    return {
        id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
            var r = Math.random() * 16 | 0, v = r;
            return v.toString(16);
        }),
        type: faker.helpers.arrayElement(['Male', 'Female']),
        buildingId: faker.helpers.arrayElement([
            `37e4eb43437e75b6c65df2a96f54f938`,
            `3e2435d9670b541e8ef5b21050444dd7`,
            `6dc3d39e1b4dc7cece7a84908cf042bb`,
            `9d4ba2f777964c7ce20145c2ae54cc65`,
            `b69711489388b2092ed8d68cbb20b9d7`
        ]),
        rootNumber: faker.number.bigInt() + "",
        floor: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
        status: faker.helpers.arrayElement(['Vacant', 'Occupied', 'Under maintenance']),
        createTime: new Date(),
        updateTime: new Date()
    }
}

export default fakeDormitories