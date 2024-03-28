import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Users } from "./Users";

import { server } from "./../../msw/mocks";
import { rest } from "msw";
import httpStatus from "http-status";

import userListResponse from "./testUtils/userListResponse";
import userEvent from "@testing-library/user-event";
import { getCurrentMilliseconds } from "../utils/utils";

describe("Users component", () => {
  beforeEach(() => {
    server.use(
      rest.get("http://localhost:4000/users*", (req, res, ctx) =>
        res(ctx.json(userListResponse))
      )
    );
  });

  it("renders the title", async () => {
    await act(async () => {
      render(<Users />);
    });
    const titleElement = screen.getByText("User list");
    await waitFor(() => expect(titleElement).toBeInTheDocument());
  });

  it("renders the users table", async () => {
    await act(async () => {
      render(<Users />);
    });
    const usersTableElement = await screen.findByTestId("users-table");
    expect(usersTableElement).toBeInTheDocument();
  });

  it("opens the creation modal when the 'Add User' button is clicked", async () => {
    await act(async () => {
      render(<Users />);
    });

    await act(async () => {
      const addUserButton = await screen.findByTestId("create-user-button");
      await userEvent.click(addUserButton);
    });

    const creationModalElement = await screen.findByTestId("creation-modal");
    expect(creationModalElement).toBeInTheDocument();
  });

  it("submits the form when the 'Save' button is clicked", async () => {
    // Arrange.

    server.use(
      rest.post("http://localhost:4000/users", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.CREATED),
          ctx.json({
            message: "User added with ID: 1153",
          })
        )
      )
    );

    // Act.

    await act(async () => {
      render(<Users />);
    });

    await act(async () => {
      const addUserButton = await screen.findByTestId("create-user-button");
      await userEvent.click(addUserButton);
    });

    const creationModalElement = await screen.findByTestId("creation-modal");

    const firstNameInput = await screen.findByTestId("firstname-input");
    const lastNameInput = await screen.findByTestId("lastname-input");
    const emailInput = await screen.findByTestId("email-input");
    const usernameInput = await screen.findByTestId("username-input");
    const password1Input = await screen.findByTestId("password1-input");
    const password2Input = await screen.findByTestId("password2-input");
    const submitUserButton = await screen.findByTestId("submit-user-button");

    const currentMilliseconds = getCurrentMilliseconds();

    const newUser = {
      firstname: "John",
      lastname: "Doe",
      email: `johndoe${currentMilliseconds}@testemail.com`,
      username: `johndoe${currentMilliseconds}`,
      password: "123456",
    };

    await act(async () => {
      await userEvent.type(firstNameInput, newUser.firstname);
      await userEvent.type(lastNameInput, newUser.lastname);
      await userEvent.type(emailInput, newUser.email);
      await userEvent.type(usernameInput, newUser.username);
      await userEvent.type(password1Input, newUser.password);
      await userEvent.type(password2Input, newUser.password);
    });

    await act(async () => {
      await userEvent.click(submitUserButton);
    });

    // Assert.

    // After a successful submission, the modal should be closed
    // and there should be no alert visible.

    const creationFormAlert = await screen.findByTestId("creation-form-alert");

    expect(creationFormAlert).not.toBeVisible();

    await waitFor(() => expect(creationModalElement).not.toBeVisible());
  });

  it("shows an error message when the form is submitted with incomplete input", async () => {
    // Arrange.

    server.use(
      rest.post("http://localhost:4000/users", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.BAD_REQUEST),
          ctx.json({
            message:
              'Validation errors: "First name" is not allowed to be empty. "Last name" is not allowed to be empty. "Email" is not allowed to be empty. "Username" is not allowed to be empty. "Password" is not allowed to be empty. ',
          })
        )
      )
    );

    // Act.

    await act(async () => {
      render(<Users />);
    });

    await act(async () => {
      const addUserButton = await screen.findByTestId("create-user-button");
      await userEvent.click(addUserButton);
    });

    const creationModalElement = await screen.findByTestId("creation-modal");

    const submitUserButton = await screen.findByTestId("submit-user-button");

    // Submit the form without filling any input.

    await act(async () => {
      await userEvent.click(submitUserButton);
    });

    // Assert.

    // An alert should be shown and the modal should still be visible.

    const creationFormAlert = await screen.findByTestId("creation-form-alert");

    expect(creationFormAlert).toBeVisible();

    await waitFor(() => expect(creationModalElement).toBeVisible());
  });
});
