import { NextResponse } from 'next/server'
import { IRepository } from '@/interfaces'
import { DatabaseError, NotFoundError, ValidationError } from '@/errors'

export class ApiService<T> {
  constructor(private repository: IRepository<T>) {}

  private handler = async <R>(fn: () => Promise<R>, status: number) => {
    try {
      const result = await fn()
      return NextResponse.json(
        result || {
          message: 'Success'
        },
        { status }
      )
    } catch (error: any) {
      console.error(error)
      if (error instanceof DatabaseError) {
        const databaseError = new DatabaseError({
          code: error.code,
          status: error.status
        })
        return NextResponse.json(databaseError, {
          status: databaseError.status
        })
      }
      return NextResponse.json(error, { status: error.status })
    }
  }

  GET = async (_: Request, context?: { params: { id?: string } }) => {
    return await this.handler(async () => {
      if (context?.params?.id) {
        const result = await this.repository.getById(Number(context.params.id))
        if (!result) {
          throw new NotFoundError({})
        }
        return result
      }
      return await this.repository.getAll()
    }, 200)
  }

  POST = async (request: Request) => {
    return await this.handler(async () => {
      const body = await request.json()
      return await this.repository.create(body)
    }, 201)
  }

  PUT = async (request: Request) => {
    return await this.handler(async () => {
      const body = await request.json()
      return await this.repository.update(body)
    }, 200)
  }

  DELETE = async (_: Request, context?: { params: { id?: string } }) => {
    return await this.handler(async () => {
      return await this.repository.delete(Number(context?.params.id))
    }, 200)
  }
}
