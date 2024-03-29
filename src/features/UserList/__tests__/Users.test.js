import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Users } from "../Users";

import { server } from "../../../msw/mocks";
import { rest } from "msw";

import userListResponse from "../../utils/testUtils/userListResponse";

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
});
