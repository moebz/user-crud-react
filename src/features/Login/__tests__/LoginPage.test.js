import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginPage } from "../../../pages/LoginPage";

describe("Login page", () => {
  it("shows a 'sign in' title", async () => {
    // Act.

    render(
      <Router>
        <LoginPage setCurrentUser={() => {}} setCurrentUserData={() => {}} />
      </Router>
    );

    // Assert.

    const titleElement = screen.getByTestId("title");

    expect(titleElement).toHaveTextContent(/sign in/i);
  });
});
