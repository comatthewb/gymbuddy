describe("Home", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should display 'no exercises' message when there are no exercises", () => {
        cy.findByText("No exercises exist.");
    });
});
