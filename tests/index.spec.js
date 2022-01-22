const path = require("path");
const { spawnSync } = require("child_process");

const appFilePath = path.join(__dirname, "../bin/index.js");

describe("When invoqued", () => {
  describe("Without any options", () => {
    it("Greets back", () => {
      const app = spawnSync("node", [appFilePath]);
      expect(app.stdout.toString().toLowerCase()).toContain("hello world");
    });
  });

  describe("With initial velocity", () => {
    describe("Correctly parsed", () => {
      describe("As -v0", () => {
        it("Returns the provided value", () => {
          const input = "something";
          const app = spawnSync("node", [appFilePath, "-v0", input]);
          expect(app.stdout.toString()).toContain(input);
        });
      });

      describe("As --initialVlocity", () => {
        it("Returns the provided value", () => {
          const input = "something";
          const app = spawnSync("node", [
            appFilePath,
            "--initialVelocity",
            input,
          ]);
          expect(app.stdout.toString()).toContain(input);
          expect(app.stderr.toString()).toBeFalsy();
        });
      });
    });

    describe("Without any value", () => {
      it("Throws an error", () => {
        const app = spawnSync("node", [appFilePath, "-v0"]);
        expect(app.stdout.toString()).toBeFalsy();
        expect(app.stderr.toString()).toContain("argument missing");
      });
    });
  });
});
