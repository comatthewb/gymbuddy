describe("AddExercise", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/add");
    });

    it("should support adding an exercise", () => {
        //should require all fields, so submit the form empty
        cy.findByRole("button", { name: "Save Exercise" }).click();

        //Now, validation error message should display
        cy.findByText("Please enter a name for the exercise.");

        cy.findAllByLabelText("Exercise").type("Hula hoop");
        cy.findAllByLabelText("Weight").type("5");
        cy.findByRole("button", { name: "Save Exercise" }).click();

        // Confirm saved data displays on home page.
        cy.findByText("Hula hoop");
        cy.findByText("5");
    });

    it("should validate onBlur", () => {
        //Initially, no validation errors should display
        cy.findByText("Please enter a name for the exercise.").should("not.exist");
        cy.findAllByLabelText("Exercise").focus().blur();
        cy.findAllByLabelText("Weight").focus().blur();

        //Now, validation error message should display
        cy.findByText("Please enter a name for the exercise.");
        cy.findByText("Please enter a weight for the exercise.");
    });
});
