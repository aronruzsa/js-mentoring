const supertest = require("supertest");
const request = supertest("https://gorest.co.in/public/v2/");
const TOKEN = require("./resources/token");

const userData = {
    email: `test${Math.floor(Math.random() * 1000 + 1)}@testemail.com`,
    name: "Andrew Bernard",
    gender: "male",
    status: "inactive"
};

const newData = {
    name: "Clark Kent",
    status: "active"
};

let userId = null;

export const createUser = async (userData) => {
    try {
        const res = await request
            .post("users")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(userData);
        userId = res.body.id;
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getUserById = async (userId) => {
    try {
        const res = await request
            .get(`users/${userId}`)
            .set("Authorization", `Bearer ${TOKEN}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const updateUser = async(userId, newData) => {
    try {
        const res = await request
            .put(`users/${userId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(newData);
        return res;
    } catch (err) {
        console.log(err);
    }
}


export const deleteUser = async (userId) => {
    try {
        const res = await request
            .delete(`users/${userId}`)
            .set("content-type", "application/json")
            .set("Authorization", `Bearer ${TOKEN}`)
        return res;    
    } catch (err) {
        console.log(err);
    }
}

(async () => {
    try {
        await createUser(userData);
        await getUserById(userId);
        await updateUser(userId, newData);
        await deleteUser(userId);
    } catch (err) {
        console.log(err);
    }
});
