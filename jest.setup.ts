import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'

import { prepareTestsEnvironment } from './src/tests/orchestrator'

beforeAll(async () => {
  await prepareTestsEnvironment()
})
