/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['packages', 'node_modules'],
  collectCoverage: true,
  coverageReporters: ['text']
}
