describe("MainContent component", () => {
    it("should be visible when adding a new player", () => {
        cy.visit("/")
        cy.get(".add-player").click()
        cy.get(".modal").should("be.visible")
    })
})
