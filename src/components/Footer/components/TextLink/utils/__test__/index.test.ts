import { addPrefixUrl } from "..";
import { blogInfo, destinationInfo } from "../../../Column/constants";

describe("TextLink utils", () => {
  describe("addPrefixUrl", () => {
    const baseUrl = "https://example.com"; // Replace with your base URL

    it("Should return the columnData intact if baseUrl is undefined", () => {
      const result = addPrefixUrl(destinationInfo.columnInfo);
      expect(result).toEqual(destinationInfo.columnInfo);
    });

    it("Should return the columnData with URLs prefixed with baseUrl", () => {
      const result = addPrefixUrl(blogInfo.columnInfo, false, baseUrl);
      const expected = blogInfo.columnInfo.map((link) => {
        return {
          ...link,
          href: baseUrl + link.href,
        };
      });
      expect(result).toEqual(expected);
    });

    it("Should return the columnData intact if enableSubPathsOnly is true", () => {
      const result = addPrefixUrl(destinationInfo.columnInfo, true, baseUrl);
      expect(result).toEqual(destinationInfo.columnInfo);
    });
  });
});
