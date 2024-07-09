class LoginPageAlternative {

    visit() {
        cy.log("Open login page");
        cy.visit('/index.php?rt=account/login');
    }

    getLoginNameInputField() {
        return cy.get('#loginFrm_loginname');
    }

    getPasswordInputField() {
        return cy.get('#loginFrm_password');
    }

    getLoginButton() {
        return cy.get('[title="Login"]');
    }

    getErrorMessageText() {
        return cy.get('.alert.alert-error.alert-danger');
    }

    fillLoginForm(loginName, password) {
        cy.log("Fill login form");
        loginName ? this.getLoginNameInputField().type(loginName) : cy.log("Keep loginName input field empty");
        password ? this.getPasswordInputField().type(password) : cy.log("Keep password input field empty");
    }

    submitLoginForm(loginName, password) {
        cy.log("Fill login form");
        loginName ? this.getLoginNameInputField().type(loginName) : cy.log("Keep loginName input field empty");
        password ? this.getPasswordInputField().type(password) : cy.log("Keep password input field empty");

        this.getLoginButton().click();
    }

}

export default new LoginPageAlternative();
