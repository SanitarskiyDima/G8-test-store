import user from '../fixtures/user.json';
import {faker} from '@faker-js/faker';
import homePage from '../support/pages/HomePage';
import loginPage from "../support/pages/LoginPage";
import accountPage from "../support/pages/AccountPage";
import loginPageAlternative from "../support/pages/LoginPageAlternative";

beforeEach(() => {
    homePage.visit();
    homePage.clickLoginOrRegisterButton();
})

it('Successful authorization', () => {
    loginPage.fillLoginForm(user.loginname, user.password);
    loginPage.clickLoginButton();
    accountPage.getFirstNameText().should('have.text', user.firstname);
})

describe('Negative authorization test suite', () => {

    afterEach(() => {
        loginPage.clickLoginButton();

        cy.log('Verify error message');
        loginPage.getErrorMessageText().should('have.text', `\n×\nError: Incorrect login or password provided.`)
    })

    it('User cannot login with incorrect loginname', ({page, req}) => {
        user.loginname = faker.internet.userName();
        loginPage.fillLoginForm(user.loginname, user.password);
    })

    it('User cannot login with empty loginname', () => {
        loginPage.fillLoginForm('', user.password);
    })

    it('User cannot login with incorrect password', () => {
        user.password = faker.internet.userName();
        loginPage.fillLoginForm(user.loginname, user.password);
    })

    it('User cannot login with empty password', () => {
        loginPage.fillLoginForm(user.loginname, '');
    })
})


it('User cannot login with empty password', () => {
    loginPageAlternative.getLoginNameInputField().type(user.loginname);
    // loginPageAlternative.getPasswordInputField().type(' ');
    loginPageAlternative.getLoginButton().click();
    loginPageAlternative.getErrorMessageText().should('have.text', `\n×\nError: Incorrect login or password provided.`)
})
