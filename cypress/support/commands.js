Cypress.Commands.add("create_new_account", (jdd) => {
    // create different IDs
    let id = Math.floor(Math.random() * 1000)
    cy.get('#btnCreateAccount').contains('Créer un compte').click()
        cy.url().should('contain','/Authenticate?returnUrl=%2F')
        cy.get('#CreationFormModel_RegisterLastname').type(jdd.Lastname).should('have.value',jdd.Lastname)
        cy.get('#CreationFormModel_RegisterFirstname').type(jdd.Firstname).should('have.value',jdd.Firstname)
        cy.get('#birthdateInputDay').type(jdd.birthdate_Day).should('have.value',jdd.birthdate_Day)
        cy.wait(2000)
        cy.get('#birthdateInputMonth').type(jdd.birthdate_month,{force:true}).should('have.value',jdd.birthdate_month)
        cy.get('#birthdateInputYear').type(jdd.birthdate_year).should('have.value',jdd.birthdate_year)
        cy.get('#CreationFormModel_RegisterEmail').type(jdd.Name_email+id+jdd.domain_email).should('have.value',jdd.Name_email+id+jdd.domain_email)
        cy.get('#CreationFormModel_RegisterPassword').type(jdd.Password).should('have.value',jdd.Password)
        cy.get('#CreationFormModel_AcceptCGU').check({force:true})
        cy.get('[class="btn btn-primary btn-submit-form"]').contains('Créer un compte').click()     
})

Cypress.Commands.add('urlWebSite', (url )=>{
    cy.url().should('contain', url)
})
