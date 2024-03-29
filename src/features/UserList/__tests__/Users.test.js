import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";

import { rest } from "msw";

import { server } from "../../../../msw/mocks";
import userListResponse from "./utils/userListResponse";
import { UsersPage } from "../../../pages/UsersPage";

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
      render(<UsersPage />);
    });
    const titleElement = screen.getByText("User list");
    await waitFor(() => expect(titleElement).toBeInTheDocument());
  });

  it("renders the users table", async () => {
    await act(async () => {
      render(<UsersPage />);
    });
    const usersTableElement = await screen.findByTestId("users-table");
    expect(usersTableElement).toBeInTheDocument();
  });
});
