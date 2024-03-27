// Require and add to global so msw can be used.
const { TextEncoder, TextDecoder } = require("text-encoding");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
