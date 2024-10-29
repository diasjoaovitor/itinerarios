import { NextResponse } from 'next/server'
import { prepareTestsEnvironment } from '@/orchestrator'

export const DELETE = async () => {
  try {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.MARIADB_DATABASE === 'local_database'
    ) {
      await prepareTestsEnvironment()
      return NextResponse.json({ message: 'Success' }, { status: 200 })
    }
    return NextResponse.json({ message: 'Not allowed' }, { status: 405 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
