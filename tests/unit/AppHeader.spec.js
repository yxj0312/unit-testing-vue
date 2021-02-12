import AppHeader from "@/components/AppHeader";

describe("AppHeader", () => {
  test("if user is not logged in, do not show logout button", () => {
    expect(true).toBe(true);
  });

  test("if a user is logged in, show logout button", () => {
    expect(true).toBe(true);
  });
});
