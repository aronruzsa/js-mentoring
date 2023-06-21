import puppeteer from "puppeteer";
import { describe, test, beforeEach, afterEach } from "@jest/globals"
import { expect } from "chai";
import { pino } from "pino";
import { login } from "../pages/homePage";
import selectors from "../helpers/selectors";

const logger = pino();

describe("Home page tests", () => {

    test("should login with valid credentials", async () => {
        logger.info("Login with valid user");
        let browser = await puppeteer.launch({ headless: false });
        let page = await browser.newPage();

        await page.setViewport({ width: 1080, height: 1024 });
        await page.goto("https://www.saucedemo.com/");

        const loginInput = "#user-name";
        const passwordInput = "#password";
        const loginBtn = "#login-button";

        await page.waitForSelector(loginInput);
        await page.type(loginInput, "standard_user");
        await page.type(passwordInput, "secret_sauce");
        await page.click(loginBtn);

        const header = await page.$(".header_label");
        let text = await (await header.getProperty("textContent")).jsonValue();
        expect(text).to.eq("Swag Labs");

        await browser.close();
    })
})