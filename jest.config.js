const nextJest = require('next/jest')
const { configDotenv } = require('dotenv')
const { expand } = require('dotenv-expand')

expand(
  configDotenv({
    path: '.env.development'
  })
)

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
    '^@/infra(.*)$': '<rootDir>/src/infra$1'
  }
})

module.exports = jestConfig
