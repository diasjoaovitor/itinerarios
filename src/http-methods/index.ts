import { NextResponse } from 'next/server'
import { addToDb, deleteFromDb, getFromDb, updateInDb } from '@/models'
import { DatabaseError } from '@/errors'

export const httpMethods = (table: string) => ({
  GET: async () => {
    try {
      const result = await getFromDb(table)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      console.error(error)
      const databaseError = new DatabaseError({
        code: error.code
      })
      return NextResponse.json(databaseError, { status: databaseError.status })
    }
  },
  POST: async (request: Request) => {
    try {
      const body = await request.json()
      const result = await addToDb(table, body)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      console.error(error)
      const databaseError = new DatabaseError({
        code: error.code
      })
      return NextResponse.json(databaseError, { status: databaseError.status })
    }
  },
  PATCH: async (request: Request) => {
    try {
      const body = await request.json()
      const result = await updateInDb(table, body)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      console.error(error)
      const databaseError = new DatabaseError({
        code: error.code
      })
      return NextResponse.json(databaseError, { status: databaseError.status })
    }
  },
  DELETE: async (request: Request) => {
    try {
      const args = await request.json()
      const result = await deleteFromDb(args)
      return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
      console.error(error)
      const databaseError = new DatabaseError({
        code: error.code
      })
      return NextResponse.json(databaseError, { status: databaseError.status })
    }
  }
})
