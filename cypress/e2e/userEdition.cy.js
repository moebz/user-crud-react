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

  it("Creates an user", () => {
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

        // Assert that the edition modal doesn't exist yet.

        cy.getByTestId("edition-modal").should("not.exist");

        // Click the edit user button so the creation modal opens.

        cy.get("tr")
          .eq(0)
          .within(() => {
            cy.getByTestId("edit-user-button").click();
          });
      });
    });

    // Assert that the edition modal exists.

    cy.getByTestId("edition-modal").should("exist");

    // [START Error path: submit the form without the name.]

    // Clear the name input.

    cy.getByTestId("firstname-input").clear();

    // Assert that the error message is not displayed yet.

    cy.getByTestId("edition-form-alert").should("not.be.visible");

    // Submit the form without the name.

    cy.getByTestId("submit-user-edition-button").click();

    // Assert that the error message is displayed.

    cy.getByTestId("edition-form-alert").should("be.visible");

    // Try to hide the error message.

    cy.getByTestId("edition-form-alert").within(() => {
      cy.get("button[aria-label='close']").click();
    });

    // Check that the error message is no longer displayed.

    cy.getByTestId("edition-form-alert").should("not.be.visible");

    // Restore the name.

    cy.getByTestId("firstname-input").type(newUser.firstname);

    // [END Error path: submit the form without any input.]

    // Change something.

    const newLastname = "newLastname";

    cy.getByTestId("lastname-input").clear();
    cy.getByTestId("lastname-input").type(newLastname);

    // Submit the edition form.

    cy.getByTestId("submit-user-edition-button").click();

    // Assert that the edition modal doesn't exist anymore.

    cy.getByTestId("edition-modal").should("not.exist");

    // Search the recently edited user.

    cy.getByTestId("filter-input").within(() => {
      cy.get("input").clear();
    });
    cy.getByTestId("filter-input").type(newUser.username);

    cy.getByTestId("apply-filter-button").click();

    cy.getByTestId("users-table").within(() => {
      cy.get("tbody").within(() => {
        cy.get("tr").should("have.length", 1);

        // Assert that the user exist in the users table.

        cy.get("td").eq(0).should("contain", newUser.firstname);

        // Assert that the user's lastname has been edited.

        cy.get("tr").should("contain", newLastname);
      });
    });
  });
});
