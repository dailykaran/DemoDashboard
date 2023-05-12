/// <reference types="cypress" />

describe('SF - Vistual testing by Cypress-Image-snapshots', () => {

    function loginSFadmin() {
        cy.visit("http://localhost:5000/login");
        cy.get('.auth0-lock-social-button[data-provider="oauth2"]').click();
        cy.url().should('include', 'registry-dev.paratext.org');
        cy.location('href').should('include', 'registry-dev.paratext.org');
        
        cy.get('.container i.fa.fa-spinner', {timeout: 50000}).should('not.exist');
        cy.get('div#email-group input[name="email"]').clear();
        cy.get('div#email-group input[name="email"]').type('dinakaran@ecgroup-intl.com').type('{enter}');
        cy.get('button[type="submit"] i:visible', {timeout: 90000}).should('be.visible');
        cy.get('div#password-group input[name="password"]', {timeout: 90000}).type('dinakaran83').type('{enter}');
        cy.get('div button[type="submit"] i:visible').click();
    
        cy.get('.btn.btn-success', {timeout: 5000}).should('be.visible').click();
        cy.get('.btn.btn-success', {timeout: 90000}).should('not.exist');
        
        cy.url().should('include', 'localhost:5000/projects');
        //cy.location('href').should('include', 'localhost:5000/projects');
        cy.get('mdc-top-app-bar-section .avatar-container', {timeout: 60000}).should('exist');
        // cy.url().should('contain', /#access_token/);
        cy.location('href').should('include', 'localhost:5000/projects');
    };
    
    function logoutUser(){
        cy.get('mdc-top-app-bar-section #nav-logo').click();
        cy.location('href').should('include', '/projects');
        cy.get('.avatar-container', {timeout: 90000}).eq(0).click({force: true});
        cy.get('mdc-menu.mdc-menu-surface mdc-list-group').last().should('exist');
        cy.get('mdc-list mdc-list-item[name="logout"]').click({force: true});
        //cy.url().should('eq', 'http://localhost:5000/');
    };

    function navigationPage(pageName){
        cy.get('mdc-drawer-content mdc-list-item').each(($txt) => {
            const splitToWord = $txt.text().split(' ')
            if(splitToWord[1].includes(pageName)){
                $txt.trigger('click');
                expect(splitToWord[1]).to.equal(pageName);
                if(splitToWord[1].includes('Users')){
                    cy.location('pathname').should('include', '/users');
                    cy.get('#project-users-table', {timeout: 90000}).should('exist');
                    cy.get('.avatar-container', {timeout: 90000}).should('exist');
                }    
            }
        }).then( () => {
            cy.get('.mdc-linear-progress--closed', {timeout: 90000}).should('exist');
            //cy.matchImageSnapshot(pageName);
        });
    }

    function waitPageForTask() {
        cy.window().its('performance.navigation.type').should('eq', 0);
        cy.get('.mdc-linear-progress--closed', {timeout: 90000}).should('exist');
        cy.get('quill-editor usx-chapter', {timeout: 70000}).should('exist');
    }

    function UnderOverviewAndBook(UnderTestPaneElement, PageName, IndexOfElement, TestName) {
        cy.url().then(($getURLStatus) => {            
            if($getURLStatus.includes(PageName)) {
                cy.get(UnderTestPaneElement).next().find('.mdc-list-item.mdc-ripple-upgraded').filter(':visible').eq(IndexOfElement).click();
                cy.get('.mdc-linear-progress--closed', {timeout: 90000}).should('exist');
                //cy.matchImageSnapshot(TestName);
            }
            else{
                cy.get(UnderTestPaneElement).click();
                cy.get(UnderTestPaneElement).next().find('.mdc-list-item.mdc-ripple-upgraded').filter(':visible').eq(IndexOfElement).click();
                if(IndexOfElement == 2 || IndexOfElement == 1) {
                    cy.get('quill-editor usx-chapter', {timeout: 70000}).eq(0).should('exist');
                    //cy.matchImageSnapshot(TestName);
                }
                else{
                //cy.matchImageSnapshot(TestName);
                }
            }
        })
        
    }

    function selectProject(targetproject) {
        //cy.get(sfElm.connectProject.listOfProject).last().scrollIntoView({ offset: { top: 650, left: 0 } });
        cy.window().its('performance.navigation.type').should('eq', 0);
        cy.get('.mdc-linear-progress--closed', {timeout: 90000}).should('exist');
        cy.get('.mdc-select__selected-text').click();
        cy.get('mdc-menu mdc-list mdc-list-item').filter(':visible').each(($txt) => {
            const splitToWord = $txt.text().split(' ')
            if(splitToWord[2].includes(targetproject)){
                $txt.trigger('click');
                expect(splitToWord[2]).to.equal(targetproject);
                cy.get('.mdc-linear-progress--closed', {timeout: 90000}).should('exist');
            }
        });
        
    }

    before( function() {
        
        let logintest = new loginSFadmin();
        let selectAProjec = new selectProject("SpanishPortuguese");
    })

    after(function() {
        let logouTest = new logoutUser();
    })


    it.only('Navigate to SF Sync Page', function() {
        let navigationPages = new navigationPage('Synchronize');
    })

    it('Navigtion to users page', function() {
        let navigationPages = new navigationPage('Users');
    })

    it('Navigtion to book page under translate', function() {       
        let waitPageForTasks = new waitPageForTask();

        let UnderOverviewAndBooks = new UnderOverviewAndBook('.mdc-list-item.translate-nav-item', '/translate', 2, this.test.title);
    })

    it('Navigtion to book page under Community Checking', function() {
        let waitPageForTasks = new waitPageForTask();
        let UnderOverviewAndBooks = new UnderOverviewAndBook('.mdc-list-item.community-checking-nav-item', '/checking', 2, this.test.title);
    })

    it('Navigtion to Settings page', function() {
        let navigationPages = new navigationPage('Settings');        
    })

    it('Navigtion to overview page under translate', function() {
        let waitPageForTasks = new waitPageForTask();
        let UnderOverviewAndBooks = new UnderOverviewAndBook('.mdc-list-item.translate-nav-item', '/translate', 0, this.test.title);
    })

    it('Navigtion to overview page under Community Checking', function() {
        let waitPageForTasks = new waitPageForTask();
        let UnderOverviewAndBooks = new UnderOverviewAndBook('.mdc-list-item.community-checking-nav-item', '/checking', 0, this.test.title);
    })

    it('Navigtion to Connect-project page', function() {

        cy.visit('http://localhost:5000/connect-project');
        cy.window().its('performance.navigation.type').should('eq', 0);
        cy.get('mdc-select div[role="button"]', {timeout: 90000}).should('be.visible').then( () => {
            cy.get('.mdc-linear-progress--closed', {timeout: 9000}).should('exist');
            //cy.matchImageSnapshot('Connect-project');
        });


    })

})

