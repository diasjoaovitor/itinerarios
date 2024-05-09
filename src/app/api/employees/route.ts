import { NextResponse } from 'next/server'
import { DatabaseError } from '@/errors'
import { httpMethods } from '@/http-methods'
import { deleteEmployeesFromDb } from '@/models'

export const { GET, PATCH, POST } = httpMethods('employees')

export const DELETE = async (request: Request) => {
  try {
    const ids: number[] = await request.json()
    const result = await deleteEmployeesFromDb(ids)
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error(error)
    const databaseError = new DatabaseError({
      code: error.code
    })
    return NextResponse.json(databaseError, { status: databaseError.status })
  }
}
