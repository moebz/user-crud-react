const { getCurrentMilliseconds } = require("../../src/utils/utils");

describe("User creation", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.getByTestId("username-input").type("theTestUser");
    cy.getByTestId("password-input").type("123456");
    cy.getByTestId("submit-input").click();
    cy.url().should("include", "/home");
    cy.getByTestId("logout-button").should("exist");
  });

  it("Creates a user", () => {
    // Go to the users page.

    cy.visit("/users");

    // Assert that the creation modal doesn't exist yet.

    cy.getByTestId("creation-modal").should("not.exist");

    // Click the create user button so the creation modal opens.

    cy.getByTestId("create-user-button").click();

    // Assert that the creation modal exists.

    cy.getByTestId("creation-modal").should("exist");

    // [START Error path: submit the form without any input.]

    // Assert that the error message is not displayed yet.

    cy.getByTestId("creation-form-alert").should("not.be.visible");

    // Submit the form without any input.

    cy.getByTestId("submit-user-button").click();

    // Assert that the error message is displayed.

    cy.getByTestId("creation-form-alert").should("be.visible");

    // Try to hide the error message.

    cy.getByTestId("creation-form-alert").within(() => {
      cy.get("button[aria-label='close']").click();
    });

    // Check that the error message is no longer displayed.

    cy.getByTestId("creation-form-alert").should("not.be.visible");

    // [END Error path: submit the form without any input.]

    // Create a new user and fill out the form.

    const currentMilliseconds = getCurrentMilliseconds();

    const newUser = {
      firstname: "John",
      lastname: "Doe",
      email: `johndoe${currentMilliseconds}@testemail.com`,
      username: `johndoe${currentMilliseconds}`,
      password: "123456",
    };

    cy.getByTestId("firstname-input").type(newUser.firstname);
    cy.getByTestId("lastname-input").type(newUser.lastname);
    cy.getByTestId("email-input").type(newUser.email);
    cy.getByTestId("username-input").type(newUser.username);
    cy.getByTestId("password1-input").type(newUser.password);

    // [START Error path: submit the form with a different password confirmation field.]

    cy.getByTestId("password2-input").type("somethingElse");

    // Submit the form.

    cy.getByTestId("submit-user-button").click();

    // Assert that the error message is displayed.

    cy.getByTestId("creation-form-alert").should("be.visible");
    // Try to hide the error message.

    cy.getByTestId("creation-form-alert").within(() => {
      cy.get("button[aria-label='close']").click();
    });

    // Check that the error message is no longer displayed.

    cy.getByTestId("creation-form-alert").should("not.be.visible");

    // [END Error path: submit the form with a different password confirmation field.]

    // Type the correct password confirmation.

    cy.getByTestId("password2-input").clear();
    cy.getByTestId("password2-input").type(newUser.password);

    // Submit the form.

    cy.getByTestId("submit-user-button").click();

    // Assert that the creation modal doesn't exist anymore.

    cy.getByTestId("creation-modal").should("not.exist");

    // Search the recently created user.

    cy.getByTestId("filter-input").type(newUser.username);

    cy.getByTestId("apply-filter-button").click();

    // Assert that the user exist in the users table.

    cy.getByTestId("users-table").within(() => {
      cy.get("tbody").within(() => {
        cy.get("tr").should("have.length", 1);
        cy.get("td").eq(0).should("contain", newUser.firstname);
      });
    });
  });
});
