describe("Nav", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("should navigate to Add Exercise page on click of Add Exercise button", () => {
        cy.findByRole("link", { name: "Add Exercise" }).should("exist").click();
        cy.url().should("be.equal", "http://localhost:3000/add");
    });
    it("should navigate to Home page on click of Home button", () => {
        cy.findByRole("link", { name: "Home" }).should("exist").click();
        cy.url().should("be.equal", "http://localhost:3000/");
    });
});
