import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Users } from "./Users";

import { server } from "./../../msw/mocks";
import { rest } from "msw";
import httpStatus from "http-status";

import userListResponse from "../utils/testUtils/userListResponse";
import userEvent from "@testing-library/user-event";
import { getCurrentMilliseconds } from "../utils/utils";

describe("User edition", () => {
  beforeEach(() => {
    server.use(
      rest.get("http://localhost:4000/users*", (req, res, ctx) =>
        res(ctx.json(userListResponse))
      )
    );
  });

  it("opens the edition modal when the 'Edit' button is clicked", async () => {
    await act(async () => {
      render(<Users />);
    });

    await act(async () => {
      const editUserButtons = await screen.findAllByTestId("edit-user-button");
      await userEvent.click(editUserButtons[0]);
    });

    const editionModalElement = await screen.findByTestId("edition-modal");
    expect(editionModalElement).toBeInTheDocument();
  });

  it("submits the edition form when the 'Save' button is clicked", async () => {
    // Arrange.

    server.use(
      rest.post("http://localhost:4000/users/:id/update", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.OK),
          ctx.json({
            message: "User modified with ID: 1151",
          })
        )
      )
    );

    // Act.

    await act(async () => {
      render(<Users />);
    });

    await act(async () => {
      const editUserButtons = await screen.findAllByTestId("edit-user-button");
      await userEvent.click(editUserButtons[0]);
    });

    const editionModalElement = await screen.findByTestId("edition-modal");

    const emailInput = await screen.findByTestId("email-input");
    const submitUserButton = await screen.findByTestId(
      "submit-user-edition-button"
    );

    const currentMilliseconds = getCurrentMilliseconds();

    const newUser = {
      email: `johndoe${currentMilliseconds}@testemail.com`,
    };

    await act(async () => {
      await userEvent.type(emailInput, newUser.email);
    });

    await act(async () => {
      await userEvent.click(submitUserButton);
    });

    // Assert.

    // After a successful submission, the modal should be closed
    // and there should be no alert visible.

    const editionFormAlert = await screen.findByTestId("edition-form-alert");

    await waitFor(() => expect(editionFormAlert).not.toBeVisible());

    await waitFor(() => expect(editionModalElement).not.toBeVisible());
  });

  it("shows an error message when the edition form is submitted with incomplete input", async () => {
    // Arrange.

    server.use(
      rest.post("http://localhost:4000/users/:id/update", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.BAD_REQUEST),
          ctx.json({
            message:
              'Validation errors: "Password confirmation" does not match. ',
          })
        )
      )
    );

    // Act.

    await act(async () => {
      render(<Users />);
    });

    await act(async () => {
      const editUserButtons = await screen.findAllByTestId("edit-user-button");
      await userEvent.click(editUserButtons[0]);
    });

    const editionModalElement = await screen.findByTestId("edition-modal");

    const emailInput = await screen.findByTestId("email-input");
    const submitUserButton = await screen.findByTestId(
      "submit-user-edition-button"
    );

    await act(async () => {
      await userEvent.type(emailInput, "");
    });

    await act(async () => {
      await userEvent.click(submitUserButton);
    });

    // Assert.

    // After a successful submission, the modal should be closed
    // and there should be no alert visible.

    const editionFormAlert = await screen.findByTestId("edition-form-alert");

    await waitFor(() => expect(editionFormAlert).toBeVisible());

    await waitFor(() => expect(editionModalElement).toBeVisible());
  });
});
