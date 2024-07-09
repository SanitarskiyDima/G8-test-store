import BasePage from "./BasePage";

class HomePage extends BasePage{

    constructor() {
        super();
    }

    visit() {
        cy.log("Open home page");
        cy.visit('/');
    }

}

export default new HomePage();
