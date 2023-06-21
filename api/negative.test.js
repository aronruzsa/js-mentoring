import { describe, test, beforeAll, afterAll } from '@jest/globals';
import { expect } from 'chai';
import { faker } from '@faker-js/faker';
import { postWithBadAuth, postWithoutAuth } from './negative';
import { createPost } from './posts';
import { createUser, deleteUser } from './user';
import { pino } from 'pino';

const logger = pino();

describe("Negative tests", () => {
    let userId = null;
    let postData = {
        user_id: null,
        title: `${faker.lorem.sentence(3)}`,
        body: `${faker.lorem.paragraph()}`
    };

    beforeAll(async () => {
        try {
            const userData = {
                email: `test${Math.floor(Math.random() * 1000 + 1)}@testemail.com`,
                name: faker.person.fullName({ sex: "male" }),
                gender: "male",
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

    test("401 Authentication failed", async () => {
        logger.info("post without authentication");
        postData.user_id = userId;
        const res = await postWithoutAuth(postData);
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq("Authentication failed");
    })

    test("401 Invalid token", async () => {
        logger.info("post with bad authentication");
        const res = await postWithBadAuth(postData);
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq("Invalid token");
    })

    test("422 Validation failed", async () => {
        logger.info("post empty body");
        const res = await createPost({});
        expect(res.status).to.eq(422);
    })

})
