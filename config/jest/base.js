module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'dist'],
  testTimeout: 10000,
}
