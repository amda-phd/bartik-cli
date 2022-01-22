const path = require("path");
const { spawnSync } = require("child_process");

const appFilePath = path.join(__dirname, "../bin/index.js");

describe("When invoqued", () => {
  describe("Without any options", () => {
    it("Attempts to run calculations on default JSON file", () => {
      const app = spawnSync("node", [appFilePath]);
      expect(app.status).toBe(0);
      expect(app.stderr.toString()).toBeFalsy();
      expect(app.stdout.toString()).toContain("h_max");
    });
  });

  describe("With initial velocity", () => {
    describe("And alpha", () => {
      describe("Correctly parsed", () => {
        describe("As complete name --initialVelocity and --alpha in radians", () => {
          it("Computes the trajectory", () => {
            const app = spawnSync("node", [
              appFilePath,
              "--initialVelocity",
              10,
              "--alpha",
              Math.PI / 10,
            ]);
            expect(app.status).toBe(0);
            expect(app.stderr.toString()).toBeFalsy();
            expect(app.stdout.toString()).toContain("h_max");
            expect(app.stdout.toString()).toContain("x_max");
          });
        });

        describe("In degrees", () => {
          it("Computes the trajectory", () => {
            const app = spawnSync("node", [
              appFilePath,
              "--initialVelocity",
              10,
              "--alpha",
              45,
              "--degrees",
            ]);
            expect(app.status).toBe(0);
            expect(app.stderr.toString()).toBeFalsy();
          });
        });
      });

      describe("Unexpected value", () => {
        it("Throws a helpful error", () => {
          const app = spawnSync("node", [
            appFilePath,
            "--initialVelocity",
            10,
            "--alpha",
            45,
          ]);
          expect(app.status).toBe(1);
          expect(app.stderr.toString()).toContain(
            '"alpha" must be less than or equal'
          );
        });
      });

      describe("And --json", () => {
        it("Throws a helpful error", () => {
          const app = spawnSync("node", [
            appFilePath,
            "--initialVelocity",
            10,
            "--alpha",
            Math.PI / 10,
            "--json",
          ]);
          expect(app.status).toBe(1);
          expect(app.stderr.toString()).toContain("is not allowed");
        });
      });
    });

    describe("Without alpha", () => {
      it("Throws an error and informs of the missing parameter", () => {
        const app = spawnSync("node", [appFilePath, "-v0", 10]);
        expect(app.stdout.toString()).toBeFalsy();
        expect(app.status).toBe(1);
        expect(app.stderr.toString()).toContain(
          'missing required peer "alpha"'
        );
      });
    });

    describe("Without any value", () => {
      it("Throws a helpful error", () => {
        const app = spawnSync("node", [appFilePath, "-v0"]);
        expect(app.stdout.toString()).toBeFalsy();
        expect(app.stderr.toString()).toContain("argument missing");
      });
    });
  });

  describe("With --json", () => {
    describe("Correctly parsed", () => {
      it("Computes the trajectory", () => {
        const app = spawnSync("node", [appFilePath, "--json"]);
        expect(app.status).toBe(0);
        expect(app.stderr.toString()).toBeFalsy();
        expect(app.stdout.toString()).toContain("h_max");
      });
    });

    describe("Providing file name", () => {
      describe("Without json extension", () => {
        it("Computes the trajectory", () => {
          const app = spawnSync("node", [
            appFilePath,
            "--json",
            "./tests/fixtures/customName",
          ]);
          expect(app.status).toBe(0);
          expect(app.stderr.toString()).toBeFalsy();
          expect(app.stdout.toString()).toContain("h_max");
        });
      });

      describe("With json extension", () => {
        it("Computes the trajectory", () => {
          const app = spawnSync("node", [
            appFilePath,
            "--json",
            "./tests/fixtures/customName.json",
          ]);
          expect(app.status).toBe(0);
          expect(app.stderr.toString()).toBeFalsy();
          expect(app.stdout.toString()).toContain("h_max");
        });
      });

      describe("Invalid", () => {
        it("Throws a helpful error", () => {
          const app = spawnSync("node", [
            appFilePath,
            "--json",
            "./tests/fixtures/nope",
          ]);
          expect(app.status).toBe(1);
          expect(app.stderr.toString()).toContain("Invalid source file name");
        });
      });

      describe("Badly parsed", () => {
        it("Computes the trajectory", () => {
          const app = spawnSync("node", [
            appFilePath,
            "--json",
            "./tests/fixtures/badFile",
          ]);
          expect(app.status).toBe(1);
          expect(app.stderr.toString()).toContain(
            'missing required peer "alpha"'
          );
        });
      });
    });
  });

  describe("With an unexpected option", () => {
    it("Throws a helpful error", () => {
      const app = spawnSync("node", [appFilePath, "-bla"]);
      expect(app.stdout.toString()).toBeFalsy();
      expect(app.stderr.toString()).toContain("unknown option");
    });
  });
});
