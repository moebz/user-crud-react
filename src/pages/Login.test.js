import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./Login";

import { server } from "./../../msw/mocks";
import { rest } from "msw";

test("Title with 'sign in' text is present", async () => {
  // Act.

  render(
    <Router>
      <Login setCurrentUser={() => {}} setCurrentUserData={() => {}} />
    </Router>
  );

  // Assert.

  const titleElement = screen.getByTestId("title");

  expect(titleElement).toHaveTextContent(/sign in/i);
});

test("Successful login", async () => {
  // Arrange.

  server.use(
    rest.post("http://localhost:4000/login", (req, res, ctx) =>
      res(
        ctx.json({
          data: {
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzMSwidXNlcm5hbWUiOiJzYWRmYXNmZCIsImVtYWlsIjoic3VlbWFpbEBzZXJ2ZXIuY29tIiwiZmlyc3RuYW1lIjoiU3Vub21icmUiLCJsYXN0bmFtZSI6IlN1YXBlbGxpZG9vbyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMTMyNDIxMiwiZXhwIjoxNzExMzI2MDEyfQ.6FiG8DDkn5CsY-W8QcFlV4_QJoZeT-hgvKkcwfGTbL8",
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzMSwiaWF0IjoxNzExMzI0MjEyLCJleHAiOjE3MTE0MTA2MTJ9._wRqrBCt2fPpwvC-N8AMlgXkbTKjY82tv57hFHO-WsI",
          },
        })
      )
    ),
    rest.get("http://localhost:4000/users/*", (req, res, ctx) =>
      res(
        ctx.json({
          data: {
            id: 1031,
            firstname: "Sunombre",
            lastname: "Suapellidooo",
            email: "suemail@server.com",
            username: "sadfasfd",
            role: "admin",
          },
          message: null,
        })
      )
    )
  );

  const setCurrentUser = jest.fn();
  const setCurrentUserData = jest.fn();

  // Act.

  render(
    <Router>
      <Login
        setCurrentUser={setCurrentUser}
        setCurrentUserData={setCurrentUserData}
      />
    </Router>
  );

  const usernameInput = screen.getByTestId("username-input");
  const passwordInput = screen.getByTestId("password-input");
  const signInButton = screen.getByTestId("submit-input");

  await act(async () => {
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "testpassword");

    await userEvent.click(signInButton);
  });

  // Assert.

  expect(setCurrentUser).toHaveBeenCalledTimes(1);
  expect(setCurrentUserData).toHaveBeenCalledTimes(1);
});
