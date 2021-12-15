describe("Exercises", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Should display the 'no exercises' message when there are no exercises", () => {
        cy.setUser("0-exercises@nope.com");
        cy.findByText("No exercises exist.");
    });
});
