const nextJest = require('next/jest')
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
    '^@/infra(.*)$': '<rootDir>/src/infra$1',
    '^@/mocks(.*)$': '<rootDir>/src/tests/mocks$1'
  }
})

module.exports = jestConfig
