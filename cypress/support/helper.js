import user from "../fixtures/user.json";
import loginPage from "./pages/LoginPage";
import accountPage from "./pages/AccountPage";

export function login(loginName, password) {
    loginPage.visit();
    loginPage.fillLoginForm(loginName, password);
    loginPage.clickLoginButton();
    accountPage.getFirstNameText().should('contain', user.firstname);
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

export function headlessAuthorization(loginName, password) {
    cy.request({
        method: 'GET',
        url: '/index.php?rt=account/login'
    }).then((htmlResponse) => {
        const htmlObject = window.document.createElement('html');
        htmlObject.innerHTML = htmlResponse.body;
        const csrfToken = htmlObject.querySelector('#loginFrm [name="csrftoken"]').value
        const csrfInstance = htmlObject.querySelector('#loginFrm [name="csrfinstance"]').value

        cy.request({
            method: 'POST',
            url: '/index.php?rt=account/login',
            form: true,
            body: {
                csrftoken: csrfToken,
                csrfinstance: csrfInstance,
                loginname: loginName,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })

    })
}
