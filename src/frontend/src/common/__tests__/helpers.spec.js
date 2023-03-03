import { capitalize } from "@/common/helpers";

describe("test helpers functions", () => {
  it("test capitalize", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("hello wolrd")).toBe("Hello wolrd");
  });
});
