import { describe, test, beforeAll, afterAll } from '@jest/globals';
import { expect } from 'chai';
import { faker } from '@faker-js/faker';
import { createUser, deleteUser } from "./user";
import { createPost, getPostById, updatePost, deletePost } from './posts';
import { pino } from 'pino';

const logger = pino();

describe("Tests related to 'posts'", () => {
    let userId, postId, currentPost = null;

    beforeAll(async () => {
        try {
            const userData = {
                email: `test${Math.floor(Math.random() * 1000 + 1)}@testemail.com`,
                name: faker.person.fullName({ sex: "female" }),
                gender: "female",
                status: "active"
            };
            const res = await createUser(userData);
            userId = res.body.id;
        } catch (err) {
            console.log(err);
        }

    })

    afterAll(async () => {
        try {
            await deleteUser(userId);
        } catch (err) {
            console.log(err);
        }
    })

    test("should create a post", async () => {
        logger.info("create a post");
        const postData = {
            user_id: userId,
            title: `${faker.lorem.sentence(3)}`,
            body: `${faker.lorem.paragraph()}`
        };

        const res = await createPost(postData);
        currentPost = res.body;
        postId = res.body.id;
        expect(res.status).to.eq(201);
        expect(res.body).to.deep.include(postData);
    })

    test("should get the post", async () => {
        logger.info("get post by id");
        const res = await getPostById(postId);
        expect(res.status).to.eq(200);
        expect(res.body).to.deep.include(currentPost);
    })

    test("should update the post", async () => {
        logger.info("update post");
        const newData = {
            title: "Changed title",
            body: "Changed body"
        }

        const res = await updatePost(postId, newData);
        expect(res.status).to.eq(200);
        expect(res.body).to.deep.include(newData);
    })

    test("should delete the post", async () => {
        logger.info("delete post");
        const res = await deletePost(postId);
        expect(res.status).to.eq(204);
    })

})