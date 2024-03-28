const { getCurrentMilliseconds } = require("../../src/utils/utils");

describe("User edition", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.getByTestId("username-input").type("theTestUser");
    cy.getByTestId("password-input").type("123456");
    cy.getByTestId("submit-input").click();
    cy.url().should("include", "/home");
    cy.getByTestId("logout-button").should("exist");
  });

  it("Deletes a user", () => {
    // Go to the users page.

    cy.visit("/users");

    // Create a new user and fill out the form.

    const currentMilliseconds = getCurrentMilliseconds();

    const newUser = {
      firstname: "John",
      lastname: "Doe",
      email: `johndoe${currentMilliseconds}@testemail.com`,
      username: `johndoe${currentMilliseconds}`,
      password: "123456",
    };

    cy.getByTestId("create-user-button").click();

    cy.getByTestId("firstname-input").type(newUser.firstname);
    cy.getByTestId("lastname-input").type(newUser.lastname);
    cy.getByTestId("email-input").type(newUser.email);
    cy.getByTestId("username-input").type(newUser.username);
    cy.getByTestId("password1-input").type(newUser.password);
    cy.getByTestId("password2-input").clear();
    cy.getByTestId("password2-input").type(newUser.password);

    // Submit the form.

    cy.getByTestId("submit-user-button").click();

    // Assert that the creation modal doesn't exist anymore.

    cy.getByTestId("creation-modal").should("not.exist");

    // Search the recently created user.

    cy.getByTestId("filter-input").type(newUser.username);

    cy.getByTestId("apply-filter-button").click();

    cy.getByTestId("users-table").within(() => {
      cy.get("tbody").within(() => {
        // Assert that the user exist in the users table.

        cy.get("tr").should("have.length", 1);
        cy.get("td").eq(0).should("contain", newUser.firstname);

        // Assert that the deletion modal doesn't exist yet.

        cy.getByTestId("deletion-modal").should("not.exist");

        // Click the delete user button so the deletion modal opens.

        cy.get("tr")
          .eq(0)
          .within(() => {
            cy.getByTestId("delete-user-button").click();
          });
      });
    });

    // Assert that the deletion modal exists.

    cy.getByTestId("deletion-modal").should("exist");

    // Submit the deletion form.

    cy.getByTestId("submit-user-deletion-button").click();

    // Assert that the deletion modal doesn't exist anymore.

    cy.getByTestId("deletion-modal").should("not.exist");

    // Search the recently deleted user.

    cy.getByTestId("filter-input").within(() => {
      cy.get("input").clear();
    });
    cy.getByTestId("filter-input").type(newUser.username);

    cy.getByTestId("apply-filter-button").click();

    // Assert that there was no user found.

    cy.getByTestId("no-users-alert").should("exist");
  });
});
