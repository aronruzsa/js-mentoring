import { faker } from '@faker-js/faker';

export const baseUrl = "https://gorest.co.in/public/v2/";

export const userData = {
    email: `test${Math.floor(Math.random() * 1000 + 1)}@testemail.com`,
    name: faker.person.fullName({sex: "male"}),
    gender: "male",
    status: "inactive"
};

export const newData = {
    name: faker.person.fullName({sex: "male"}),
    status: "active"
};


