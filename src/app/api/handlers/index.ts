import { NextResponse } from 'next/server'
import { DatabaseError } from '@/errors'

export const handleRequest = async (callback: () => Promise<any>) => {
  try {
    const result = await callback()
    return NextResponse.json(result || 'ok', { status: 200 })
  } catch (error: any) {
    console.error(error)
    const databaseError = new DatabaseError({
      code: error.code
    })
    return NextResponse.json(databaseError, { status: databaseError.status })
  }
}
