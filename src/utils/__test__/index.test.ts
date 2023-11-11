import { swapConsecutivePairs } from "../swapConsecutivePairs";

describe("utils", () => {
  describe("swapConsecutivePairs", () => {
    it("should swap consecutive pairs in an array", () => {
      // Arrange
      const inputArray = [1, 2, 3, 4, 5, 6];
      const expectedOutput = [2, 1, 4, 3, 6, 5];


      
      // Act
      const result = swapConsecutivePairs(inputArray);

      // Assert
      expect(result).toEqual(expectedOutput);
    });

    it("should handle an empty array", () => {
      // Arrange
      const inputArray: number[] = [];
      const expectedOutput: number[] = [];

      // Act
      const result = swapConsecutivePairs(inputArray);

      // Assert
      expect(result).toEqual(expectedOutput);
    });

    it("should handle an array with a single element", () => {
      // Arrange
      const inputArray = [1];
      const expectedOutput = [1];

      // Act
      const result = swapConsecutivePairs(inputArray);

      // Assert
      expect(result).toEqual(expectedOutput);
    });

    it("should handle an array with an odd number of elements", () => {
      // Arrange
      const inputArray = [1, 2, 3, 4, 5];
      const expectedOutput = [2, 1, 4, 3, 5];

      // Act
      const result = swapConsecutivePairs(inputArray);

      // Assert
      expect(result).toEqual(expectedOutput);
    });

    it("should handle an array with non-numeric elements", () => {
      // Arrange
      const inputArray = ["a", "b", "c", "d"];
      const expectedOutput = ["b", "a", "d", "c"];

      // Act
      const result = swapConsecutivePairs(inputArray);

      // Assert
      expect(result).toEqual(expectedOutput);
    });
  });
});
