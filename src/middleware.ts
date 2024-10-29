import { ValidationError } from '@/errors'
import { middlewares } from '@/middlewares'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const { method } = request
  const { pathname } = request.nextUrl
  const array = pathname.split('/')
  const path = array.slice(0, 4).join('/')
  const id = array.slice(4, 5)[0]

  if (id && isNaN(Number(id))) {
    const validationError = new ValidationError({
      code: 'invalid-id',
      message: 'ID inválido'
    })
    console.error(validationError)
    return NextResponse.json(validationError, {
      status: validationError.status
    })
  }

  const middlewareObject = (middlewares as any)[path]

  if (!middlewareObject) {
    return NextResponse.next()
  }

  const validation = middlewareObject[method]

  if (validation) {
    return await validation(request, id)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/v1/:path*']
}
