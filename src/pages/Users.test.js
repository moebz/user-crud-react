import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  findByTestId,
} from "@testing-library/react";
import { Users } from "./Users";

import { server } from "./../../msw/mocks";
import { rest } from "msw";
import httpStatus from "http-status";

import userListResponse from "./testUtils/userListResponse";
import userEvent from "@testing-library/user-event";
import { getCurrentMilliseconds } from "../utils/utils";

describe("Users component", () => {
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
    server.use(
      rest.post("http://localhost:4000/users", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.CREATED),
          ctx.json({
            message: "User added with ID: 1153",
          })
        )
      ),
      rest.get("http://localhost:4000/users*", (req, res, ctx) =>
        res(ctx.json(userListResponse))
      )
    );

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

    const creationFormAlert = await screen.findByTestId("creation-form-alert");

    expect(creationFormAlert).not.toBeVisible();

    await waitFor(() => expect(creationModalElement).not.toBeVisible());
  });
});
