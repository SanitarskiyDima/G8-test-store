import user from '../fixtures/user.json';
import {headlessAuthorization} from "../support/helper";
import accountPage from "../support/pages/AccountPage";


it('Dummy test to verify authorization helper', () => {
    headlessAuthorization(user.loginname, user.password);
    accountPage.visit();
    accountPage.getFirstNameText().should('have.text', user.firstname);
})
