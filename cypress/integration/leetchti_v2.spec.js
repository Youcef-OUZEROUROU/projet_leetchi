//Script without a command without a dataset
// if you want to run the tests you write this command "npm run cy:op"  in command line 
describe('Create account  and create a money pot', () => {
    //the way of data set
    let jdd = require('../fixtures/jdd.json')

    before("go to leetchi", () => {
        cy.visit("https://www.leetchi.com/")
        cy.wait(1000)
        cy.urlWebSite('www.leetchi.com/')    
    })  
    
    it('Create account and money pot', () => {
        // validate cookies
        cy.get('[class="cm-btn cm-btn-success"]').contains('Tout accepter').click()
        // Go to login       
        cy.get('#loginLink').contains('Se connecter').click()
        cy.wait(1000)
        cy.urlWebSite('/User/Authenticate')
        // Go to create new account
        //I use a command
        cy.create_new_account(jdd)
        //To Be Improve, wait dashbaord appear
        cy.wait(2000)
        //Check URL
        cy.urlWebSite('/User/AccountCreated')
        //Click I understand button and verify the account is opened
        cy.get('#btnSubmitConsentKyc').click()
        cy.get('[class="alert alert-dismissible alert-info"]').should('contain','Bravo et merci de vous être inscrit sur Leetchi.com !')
        cy.wait(2000)
        cy.get('.alert > .close').click()
        cy.get('[class="btn btn-primary"]').contains('Continuer sur le site...').click()

        //create a money pot
        //Give name pot and click button create 
        cy.get('#MoneyPotName').type('youyou',{force:true}).should('have.value','youyou')
        cy.get('#createEventButton').click()
        // Check URL and name pot
        cy.urlWebSite('#creationstep2-gifting')
        cy.get('[class="heading__lvl1"]').contains('youyou')
        //Click on event birthday and create pot
        cy.get('[class="event-type-list"]').eq('0').click()
        cy.get('#chooseEventTypeButton').click()
        //Check create money pot and click the button personalize later
        cy.get('[class="modal-title heading__lvl1"]').contains('Félicitations, votre cagnotte est prête !')
        cy.get('[class="btn-link"]').contains('Personnaliser ma cagnotte plus tard').click()
        //Click delete money pot and check delete pot
        cy.get('[class="list-label"]').contains('Supprimer ma cagnotte').click({force:true})
        cy.get('#btnConfirmDelete').click()
        cy.urlWebSite('/fr/mescagnottes')
        cy.get('[class="panel-title"]').contains('Quelle sera votre prochaine cagnotte ?')
    })
    
})