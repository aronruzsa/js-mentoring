import selectors from "../helpers/selectors";
import puppeteer from "puppeteer";

export const login = async (username, password) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.waitForSelector(selectors.usernameInput);
    await page.type(selectors.usernameInput, username);
    await page.type(selectors.passwordInput, password);
    await page.click(selectors.loginBtn);
}