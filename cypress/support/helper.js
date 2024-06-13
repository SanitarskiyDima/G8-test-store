import user from "../fixtures/user.json";

export function login(loginName, password){
    cy.log("Open home page");
    cy.visit('/');

    cy.log("Open account/login page");
    cy.get('#customer_menu_top').click();

    cy.log("Fill login form");
    cy.get('#loginFrm_loginname').type(loginName);
    cy.get('#loginFrm_password').type(password);
    cy.get('[title="Login"]').click();

    cy.log('Verify account/account page')
    cy.get('.subtext').should('contain', user.firstname);
}
