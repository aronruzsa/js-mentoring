const supertest = require("supertest");
const request = supertest("https://gorest.co.in/public/v2/");
const TOKEN = require("./resources/token");

export const createPost = async (postData) => {
    try {
        const res = await request
            .post("posts")
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(postData);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const getPostById = async (postId) => {
    try {
        const res = await request
            .get(`posts/${postId}`)
            .set("Authorization", `Bearer ${TOKEN}`);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const updatePost = async (postId, newData) => {
    try {
        const res = await request
            .put(`posts/${postId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(newData);
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = async (postId) => {
    try {
        const res = await request
            .delete(`posts/${postId}`)
            .set("Authorization", `Bearer ${TOKEN}`)
        return res;
    } catch (err) {
        console.log(err);
    }
}