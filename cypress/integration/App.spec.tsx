it("should support adding an exercise", () => {
    cy.visit("http://localhost:3000");

    //should require all fields, so submit the form empty
    cy.findByRole("button", { name: "Save Exercise" }).click();

    //Now, validation error message should display
    cy.findByText("Please enter a name for the exercise.");

    cy.findAllByLabelText("Exercise").type("Hula hoop");
    cy.findAllByLabelText("Weight").type("5");
    cy.findByRole("button", { name: "Save Exercise" }).click();

    //Now the form should be empty since it was just submitted
    cy.findByLabelText("Exercise").should("have.value", "");
    cy.findByText("Hula hoop");
    cy.findByText("5");
});

it("should validate onBlur", () => {
    cy.visit("http://localhost:3000");

    //Initially, no validation errors should display
    cy.findByText("Please enter a name for the exercise.").should("not.exist");
    cy.findAllByLabelText("Exercise").focus().blur();

    //Now, validation error message should display
    cy.findByText("Please enter a name for the exercise.");
});
