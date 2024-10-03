import { NextResponse } from 'next/server'
import { DatabaseError } from '@/errors'
import { IBaseService } from '@/interfaces'

export class BaseController<T> {
  constructor(private request: IBaseService<T>) {}

  private handleRequest = async (
    callback: () => Promise<any>,
    success: number
  ) => {
    try {
      const result = await callback()
      return NextResponse.json(result || 'ok', { status: success })
    } catch (error: any) {
      console.error(error)
      const databaseError = new DatabaseError({
        code: error.code
      })
      return NextResponse.json(databaseError, { status: databaseError.status })
    }
  }

  GET = async (_: Request, context?: { params: { id: string } }) => {
    return this.handleRequest(async () => {
      if (context && context.params.id) {
        const id = Number(context.params.id)
        return await this.request.findOne(id)
      }
      return await this.request.find()
    }, 200)
  }

  POST = async (request: Request) => {
    return this.handleRequest(async () => {
      const body = await request.json()
      return await this.request.create(body)
    }, 201)
  }

  PUT = async (request: Request) => {
    return this.handleRequest(async () => {
      const body = await request.json()
      await this.request.update(body)
    }, 201)
  }

  DELETE = async (_: Request, context: { params: { id: string } }) => {
    return this.handleRequest(async () => {
      const id = Number(context.params.id)
      await this.request.delete(id)
    }, 204)
  }
}
