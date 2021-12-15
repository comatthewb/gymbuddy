describe("Exercises", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Should display the loading message, then display the 'no exercises' message when there are no exercises", () => {
        cy.findByText("page is loading...");
        cy.setUser("0-exercises@nope.com");
        cy.findByText("No exercises exist.");

        cy.findByText("page is loading...").should("not.exist");
    });
});
