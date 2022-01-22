const path = require("path");
const { spawn } = require("child_process");

describe("When called", () => {
  it("Greets back", () => {
    const testAppFilePath = path.join(__dirname, "../bin/index.js");
    const testApp = spawn("node", [testAppFilePath]);
    testApp.stdout.on("data", (data) => {
      expect(String(data)).toContain("Hello World!");
      testApp.kill("SIGINT");
    });
  });
});
