describe('Frontend Test Spec', () => {

  it('It is possible to complete all steps with valid data', () => {
    cy.visit('/')

    // Complete step 1
    const firstName = "Bob"
    const lastName = "Bobson"
    const age = 30
    cy.get('[data-testid=firstName]').type(firstName)
    cy.get('[data-testid=lastName]').type(lastName)
    cy.get('[data-testid=age]').type(age)
    cy.get('[data-testid=submit]').click()

    // Complete step 2
    const phone = "+1 2345678"
    const email = "bob@bobson.com"
    cy.get('[data-testid=phone]').type(phone)
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=submit]').click()

    // Complete step 3
    const seat = "25B"
    const food = "vegan"
    const allergies = "peanuts, soy, gluten"
    cy.get('[data-testid=seat]').type(seat, { force: true })
    cy.get('[data-testid=food]').type(food, { force: true })
    cy.get('[data-testid=allergies]').type(allergies, { force: true })
    cy.get('[data-testid=submit]').click()

    // Validate the results page is displayed
    cy.get('[data-testid=title]').should('contain.text', "Form Successfully Submitted!")

    // Validate the results (ensure elements are present and correctly populated)
    cy.get('[data-testid=firstName]').should('have.value', firstName)
    cy.get('[data-testid=lastName]').should('have.value', lastName)
    cy.get('[data-testid=age]').should('have.value', age)
    cy.get('[data-testid=phone]').should('have.value', phone)
    cy.get('[data-testid=email]').should('have.value', email)
    cy.get('[data-testid=seat]').should('have.value', seat)
    cy.get('[data-testid=food]').should('have.value', food)
    cy.get('[data-testid=allergies]').should('have.value', allergies)

  })

  it('It is possible to navigate back and all data is preserved', () => {
    cy.visit('/')

    // Complete step 1
    const firstName = "Bob"
    const lastName = "Bobson"
    const age = 30
    cy.get('[data-testid=firstName]').type(firstName)
    cy.get('[data-testid=lastName]').type(lastName)
    cy.get('[data-testid=age]').type(age)
    cy.get('[data-testid=submit]').click()

    // Complete step 2
    const phone = "+1 2345678"
    const email = "bob@bobson.com"
    cy.get('[data-testid=phone]').type(phone)
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=submit]').click()

    // Complete step 3
    const seat = "25B"
    const food = "vegan"
    const allergies = "peanuts, soy, gluten"
    cy.get('[data-testid=seat]').type(seat, { force: true })
    cy.get('[data-testid=food]').type(food, { force: true })
    cy.get('[data-testid=allergies]').type(allergies, { force: true })
    cy.get('[data-testid=submit]').click({ force: true })

    // Click the back button
    cy.get('[data-testid=back]').click({ force: true })

    // Verify that the data is preserved
    cy.get('[data-testid=title]').should('contain.text', "Step 3")
    cy.get('[data-testid=seat]').should('have.value', seat)
    cy.get('[data-testid=food]').should('have.value', food)
    cy.get('[data-testid=allergies]').should('have.value', allergies)

    // Click the back button again
    cy.get('[data-testid=back]').click({ force: true })

    // Verify that the data is preserved
    cy.get('[data-testid=title]').should('contain.text', "Step 2")
    cy.get('[data-testid=phone]').should('have.value', phone)
    cy.get('[data-testid=email]').should('have.value', email)

    // Click the back button again
    cy.get('[data-testid=back]').click({ force: true })

    // Verify that the data is preserved
    cy.get('[data-testid=title]').should('contain.text', "Step 1")
    cy.get('[data-testid=firstName]').should('have.value', firstName)
    cy.get('[data-testid=lastName]').should('have.value', lastName)
    cy.get('[data-testid=age]').should('have.value', age)
  })

  it('It is possible to identify invalid data step 1', () => {
    // Check Step 1 validation
    cy.visit('/')

    // Submit without filling out the fields
    cy.get('[data-testid=submit]').click()

    // Wait for the validation errors and ensure their visibility
    cy.wait(2000) 
    cy.get('[data-testid=firstNameError]').should('be.visible').and('contain.text', "First name is a required field")
    cy.get('[data-testid=lastNameError]').should('be.visible').and('contain.text', "Last name is a required field")
    cy.get('[data-testid=ageError]').should('be.visible').and('contain.text', "Age must be a number")

    // Verify that invalid values are processed correctly
    const firstName = "1000"
    const lastName = "1000"
    const age = "-1000"
    cy.get('[data-testid=firstName]').type(firstName)
    cy.get('[data-testid=lastName]').type(lastName)
    cy.get('[data-testid=age]').type(age)
    cy.get('[data-testid=submit]').click()

    cy.get('[data-testid=firstNameError]').should('be.visible').and('contain.text', "First name should not contain numbers")
    cy.get('[data-testid=lastNameError]').should('be.visible').and('contain.text', "Last name should not contain numbers")
    cy.get('[data-testid=ageError]').should('be.visible').and('contain.text', "Age should be positive")

    // Check Step 2 validation
  })
  it('It is possible to identify invalid data step 2', () => {
    cy.visit('/')
    const firstName = "Bob"
    const lastName = "Bobson"
    const age = 30
    cy.get('[data-testid=firstName]').type(firstName)
    cy.get('[data-testid=lastName]').type(lastName)
    cy.get('[data-testid=age]').type(age)
    cy.get('[data-testid=submit]').click()

    // Verify required validation
    cy.get('[data-testid=submit]').click()

    cy.get('[data-testid=phoneError]').should('be.visible').and('contain.text', "Phone number is a required field")
    cy.get('[data-testid=emailError]').should('be.visible').and('contain.text', "Email is a required field")

    const email = "1000"
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=submit]').click()
    cy.get('[data-testid=emailError]').should('be.visible').and('contain.text', "Email should have correct format")
  })

  it('It is possible to identify invalid data step 3', () => {
    cy.visit('/')
    const firstName = "Bob"
    const lastName = "Bobson"
    const age = 30
    cy.get('[data-testid=firstName]').type(firstName)
    cy.get('[data-testid=lastName]').type(lastName)
    cy.get('[data-testid=age]').type(age)
    cy.get('[data-testid=submit]').click()

    // Verify required validation
    const phone = "+1 2345678"
    const email = "bob@bobson.com"
    cy.get('[data-testid=phone]').type(phone)
    cy.get('[data-testid=email]').type(email)
    cy.get('[data-testid=submit]').click()

    cy.get('[data-testid=submit]').click()
    cy.get('[data-testid=seatError]').should('be.visible').and('contain.text', "Seat is a required field")
    cy.get('[data-testid=foodError]').should('be.visible').and('contain.text', "Food is a required field")
    cy.get('[data-testid=allergiesError]').should('be.visible').and('contain.text', "Allergies is a required field")
  })
})
