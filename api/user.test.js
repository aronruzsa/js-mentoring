import { describe, test } from '@jest/globals';
import { expect } from 'chai';
import { createUser, getUserById, updateUser, deleteUser } from "./user.js";
import { userData, newData } from './resources/resources.js';
import { pino } from 'pino';

const logger = pino();

describe("User tests", () => {
    let userId, user = null;
    
    test("should create a new user", async () => {
        logger.info("create a new user");
        const res = await createUser(userData);
        userId = res.body.id;
        user = res.body;
        expect(res.body).to.deep.include(userData);
        expect(res.status).to.eq(201);
    })

    test("should get user by ID", async () => {
        logger.info("get user by id");
        const res = await getUserById(userId);
        expect(res.body).to.deep.eq(user);
        expect(res.status).to.eq(200);
    })

    test("should update user", async () => {
        logger.info("update user");
        const res = await updateUser(userId, newData);
        expect(res.body).to.deep.include(newData);
        expect(res.status).to.eq(200);

    })

    test("should delete user", async () => {
        logger.info("delete user");
        const res = await deleteUser(userId);
        expect(res.status).to.eq(204);
    })
})

