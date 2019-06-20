module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ["json", "lcov", "text", "clover", "html"],
  modulePathIgnorePatterns: ["<rootDir>/lib/"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts"
  ],
  watchPathIgnorePatterns: [
    ".*test-results.*\\.js"
  ],
  reporters: ["default", "jest-stare"],
  testResultsProcessor: "./node_modules/jest-stare"
};
