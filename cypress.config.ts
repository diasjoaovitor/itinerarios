import { defineConfig } from 'cypress'
import { configDotenv } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(
  configDotenv({
    path: '.env.development'
  })
)

export default defineConfig({
  env: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL
  },
  e2e: {
    specPattern: 'src/tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'src/tests/cypress/support/e2e.ts',
    fixturesFolder: 'src/tests/cypress/fixtures'
  }
})
