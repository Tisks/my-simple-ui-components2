module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.scss$": "jest-css-modules-transform",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
