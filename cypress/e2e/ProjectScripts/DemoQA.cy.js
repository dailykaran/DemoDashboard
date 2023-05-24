/// <reference types="cypress" />


describe('Elements Handles', function() {

    it('Text Box', () => {
        cy.visit('https://demoqa.com/');
        cy.url().should('include', 'demoqa');
        cy.get('div.category-cards div.card-body').first().click();
        cy.location('pathname').should('eq', '/elements');
        cy.get('.element-list ul li#item-0').first().click();

        //cy.wait(9000);

        //cy.get('#userName').should('be.visible').and('contain', 'Full Name');
        cy.get('#userName').type('Testing QA');
        cy.get('input#userName').invoke('val').should('not.be.empty')
        cy.get('#userEmail').type('QA123@example.in');
        cy.get('input#userEmail').invoke('val').then((txt) => { expect(txt).to.contain('QA123@example.in') });
        cy.get('#currentAddress').type('41, software campus');
        cy.get('textarea#currentAddress').should('have.value', '41, software campus');
        cy.get('#permanentAddress').type('41, software campus');
        cy.get('#submit').should('be.visible').click();


    })

    it('check box', () => {

        cy.visit('https://demoqa.com/');
        cy.url().should('include', 'demoqa');
        cy.get('div.category-cards div.card-body').first().click();

        cy.get('.element-list ul li#item-1').first().click();
        cy.url().should('include', 'checkbox');
        cy.get('button.rct-option-expand-all').click();
        cy.get('#tree-node-desktop').should('not.be.checked').check({force: true}).should('be.checked').uncheck({force: true});

        
        cy.get('ol li.rct-node-leaf input').eq(1).check({force: true});
        cy.get('ol li.rct-node-leaf input').eq(1).uncheck({force: true});

        //cy.get('ol li.rct-node-leaf input').eq(1).should('be.checked'); //To failed the testcase

        // cy.get('ol li.rct-node-leaf input').eq(2).check({force: true});
        // cy.get('ol li.rct-node-leaf input').eq(2).uncheck({force: true});

/*
        cy.get('ol li.rct-node-leaf input').each(($el, index, $list) => {
            cy.wrap($el).check({force: true});
            cy.wrap($el).uncheck({force: true});
        }) 
*/

        cy.get('ol li.rct-node-leaf span.rct-title ').eq(1).prevUntil('span.rct-checkbox').click();
        cy.get('ol li.rct-node-leaf span.rct-title ').eq(2).prevUntil('span.rct-checkbox').click();
/*
        cy.get('ol li.rct-node-leaf span.rct-title ').each(($el, index, $list) => {
            const boxName = $el.text();
            //cy.log(boxName);
            if ($el.text().trim() ===  "Public"){
                cy.wrap($el).prevUntil('span.rct-checkbox').click();
                cy.wrap($el).prevUntil('span.rct-checkbox').click();
            }
        })*/
    })

})
