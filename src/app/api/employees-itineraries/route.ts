import { NextResponse } from 'next/server'
import { DatabaseError } from '@/errors'
import { getEmployeesItinerariesFromDb } from '@/models'

export const GET = async () => {
  try {
    const result = await getEmployeesItinerariesFromDb()
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error(error)
    const databaseError = new DatabaseError({
      code: error.code
    })
    return NextResponse.json(databaseError, { status: databaseError.status })
  }
}
