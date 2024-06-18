import user from '../fixtures/user.json';
import {findNewProd, findNewProduct, findProductWithRecursion, login, myRecursionFunc} from "../support/helper";

beforeEach(() => {
    //cy.login(user.loginname, user.password);
    login(user.loginname, user.password);
})

it.skip('Place order from the main page', () => {
    let productPrice;
    let productQuantity;

    cy.log("Fill login form");
    cy.visit('/');
    cy.get('.prdocutname').first().click();
    cy.get('.productfilneprice').then(price => {
        // productPrice has value: \n\t\t\t\t\t\t\t\t\t$29.50\t\t\t\t\t\t\t\t
        // line below removes all \n and \t characters from the string and keep only 29.50
        productPrice = price.text().replace(/[\n\t]/g, '').replace('$', '');

        cy.get('.productpagecart').click();
        cy.get('#totals_table td').eq(1).should('contain', productPrice * productQuantity);
        cy.get('#totals_table td').eq(3).should('contain', '$2.00');
        cy.get('#totals_table td').eq(5).should('contain', productPrice * productQuantity + 2);
    })


    // cy.get('#cart_checkout1').click();
    // cy.get('#checkout_btn').click();
    //
    // cy.get('span.maintext').should('have.text', ' Your Order Has Been Processed!')
})


it('Homework helper function test', () => {
    cy.visit('/');
    cy.get('#filter_keyword').type('i').closest('form').submit();
    findNewProduct('Benefit Bella Bamba');
})