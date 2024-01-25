describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Renders the 'sign in' title", () => {
    cy.get('[data-testid="title"]').should("contain", "Sign in");
  });

  it("Renders the sign in input elements", () => {
    cy.get('[data-testid="username-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="submit-input"]').should("exist");
  });

  it("Allows the user to sign in", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-testid="username-input"]').type("theTestUser");
    cy.get('[data-testid="password-input"]').type("123456");
    cy.get('[data-testid="submit-input"]').click();
    cy.url().should("include", "/home");
    cy.get('[data-testid="logout-button"]').should("exist");
  });
});
