const supertest = require("supertest");
const request = supertest("https://gorest.co.in/public/v2/");

export const postWithoutAuth = async (postData) => {
    try {
        const res = await request
            .post("posts")
            .send(postData);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const postWithBadAuth = async (postData) => {
    try {
        const res = await request
            .post("posts")
            .set("Authorization", "Bearer 123456789")
            .send(postData);
        return res;
    } catch (err) {
        console.log(err);
    }
}