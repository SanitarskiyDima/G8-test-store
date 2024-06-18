import user from "../fixtures/user.json";

export function login(loginName, password) {
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


export function findProductWithRecursion(productName) {
    cy.get('body').then((body) => {
        if (body.find(`[title="${productName}"]`).length > 0) {
            cy.get(`[title="${productName}"]`).click();
        } else {
            cy.get('.pagination li a').contains('>').click();
            findProductWithRecursion(productName);
        }
    })
}

// worse alternative
export function findNewProd(productName) {
    cy.get('#filter_keyword').type('i').closest('form').submit();
    cy.get('ul.pagination a').then(pages => {
        return pages.length
    }).then(pageCount => {
        for (let i = 0; i < pageCount; i++) {
            cy.location().then(location => {
                if (!location.search.includes('product/product')) {
                    cy.get('body').then(body => {
                        if (body.find(`.prdocutname[title="${productName}"]`).length > 0) {
                            cy.get(`.prdocutname[title="${productName}"]`).click();
                        } else {
                            cy.get('ul.pagination a').contains('>').click()
                        }
                    })
                }
            })
        }
    })
}

// worse alternative to worse alternative
export function findNewProduct(productName) {

    for (let i = 1; i < 20; i++) {
        cy.location().then(location => {
            if (!location.search.includes('product/product')) {

                cy.get('body').then(body => {
                    if (body.find(`.prdocutname[title="${productName}"]`).length > 0) {
                        cy.get(`.prdocutname[title="${productName}"]`).click();
                    } else {
                        cy.get('ul.pagination a').contains(`${i + 1}`).click()
                    }
                })

            }
        })

    }

}


// export function myRecursionFunc(){
//     console.log('Hello from myRecursionFunc')
//     myRecursionFunc();
// }