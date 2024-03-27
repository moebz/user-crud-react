// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import * as polly from "../msw/pollyfills";
import { server } from "../msw/mocks";

// onUnhandledRequest: 'error' means that
// if there is a request that is not handled by this setup,
// it will throw an error, ensuring no request goes to the real server.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
