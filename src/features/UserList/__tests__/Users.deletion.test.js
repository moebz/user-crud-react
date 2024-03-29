import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";

import { rest } from "msw";
import httpStatus from "http-status";

import userEvent from "@testing-library/user-event";
import { UsersPage } from "../../../pages/UsersPage";
import { server } from "../../../../msw/mocks";
import userListResponse from "./utils/userListResponse";

describe("User deletion", () => {
  beforeEach(() => {
    server.use(
      rest.get("http://localhost:4000/users*", (req, res, ctx) =>
        res(ctx.json(userListResponse))
      )
    );
  });

  it("opens the deletion modal when the 'Delete' button is clicked", async () => {
    await act(async () => {
      render(<UsersPage />);
    });

    await act(async () => {
      const deleteUserButtons = await screen.findAllByTestId(
        "delete-user-button"
      );
      await userEvent.click(deleteUserButtons[0]);
    });

    const deletionModalElement = await screen.findByTestId("deletion-modal");
    expect(deletionModalElement).toBeInTheDocument();
  });

  it("the deletion form is closed after a successful deletion", async () => {
    // Arrange.

    server.use(
      rest.delete("http://localhost:4000/users/:id", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.OK),
          ctx.json({
            message: "User deleted with ID: 1151",
          })
        )
      )
    );

    // Act.

    await act(async () => {
      render(<UsersPage />);
    });

    await act(async () => {
      const deleteUserButtons = await screen.findAllByTestId(
        "delete-user-button"
      );
      await userEvent.click(deleteUserButtons[0]);
    });

    const submitUserButton = await screen.findByTestId(
      "submit-user-deletion-button"
    );

    await act(async () => {
      await userEvent.click(submitUserButton);
    });

    // Assert.

    // After a successful deletion, the modal should be closed.

    const deletionModalElement = await screen.findByTestId("deletion-modal");

    await waitFor(() => expect(deletionModalElement).not.toBeVisible());
  });

  it("the deletion form is not closed after a failed deletion attempt", async () => {
    // Arrange.

    server.use(
      rest.delete("http://localhost:4000/users/:id", (req, res, ctx) =>
        res(
          ctx.status(httpStatus.INTERNAL_SERVER_ERROR),
          ctx.json({
            message: "An error message",
          })
        )
      )
    );

    // Act.

    await act(async () => {
      render(<UsersPage />);
    });

    await act(async () => {
      const deleteUserButtons = await screen.findAllByTestId(
        "delete-user-button"
      );
      await userEvent.click(deleteUserButtons[0]);
    });

    const submitUserButton = await screen.findByTestId(
      "submit-user-deletion-button"
    );

    await act(async () => {
      await userEvent.click(submitUserButton);
    });

    // Assert.

    // After a failed deletion attempt, the modal should be visible.

    const deletionModalElement = await screen.findByTestId("deletion-modal");

    expect(deletionModalElement).toBeVisible();

    // An alert should be shown.

    const deletionFormAlert = await screen.findByTestId("deletion-form-alert");

    expect(deletionFormAlert).toBeVisible();
  });
});
