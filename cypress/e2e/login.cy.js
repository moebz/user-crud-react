describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Renders the 'sign in' title", () => {
    cy.getByTestId("title").should("contain", new RegExp("sign in", "i"));
  });

  it("Renders the sign in input elements", () => {
    cy.getByTestId("username-input").should("exist");
    cy.getByTestId("password-input").should("exist");
    cy.getByTestId("submit-input").should("exist");
  });

  it("Allows the user to sign in", () => {
    cy.getByTestId("username-input").type("theTestUser");
    cy.getByTestId("password-input").type("123456");
    cy.getByTestId("submit-input").click();
    cy.url().should("include", "/home");
    cy.getByTestId("logout-button").should("exist");
  });
});
