const {defineConfig} = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
    e2e: {
        viewportHeight: 1080,
        viewportWidth: 1920,
        baseUrl: "https://automationteststore.com",
        watchForFileChanges: false,
        video: true,
        // reporter: 'mochawesome',
        // reporterOptions: {
        //     reportDir: 'cypress/results', overwrite: false, html: false, json: true
        // },
        setupNodeEvents(on, config) {
            allureCypress(on);
        },
    },
});
