class AccountPage {

    constructor() {
        this.firstNameText = '.subtext';
    }

    visit() {
        cy.log("Open account page");
        cy.visit('/index.php?rt=account/account');
    }

    getFirstNameText() {
        return cy.get(this.firstNameText);
    }

}

export default new AccountPage();
