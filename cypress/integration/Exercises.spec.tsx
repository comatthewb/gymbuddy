describe("Exercises", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it.skip("Should display exercises, then support deleting exercises and display the no exercises message", () => {
        cy.findByText("No exercises exist.");
    });
});
