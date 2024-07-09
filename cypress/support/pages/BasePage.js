export default class BasePage {

    constructor() {
        this.loginOrRegisterButton = '#customer_menu_top';
    }

    // visit(url) {
    //     cy.log(`Open ${this.constructor.name} page`)
    //     cy.visit(url);
    // }

    getLoginOrRegisterButton() {
        return cy.get(this.loginOrRegisterButton);
    }

    clickLoginOrRegisterButton() {
        cy.log("Open account/login page");
        this.getLoginOrRegisterButton().click();
    }

}
