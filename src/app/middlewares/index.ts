import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'
import { employeeSchema, updateEmployeeSchema } from '@/validation'
import { ValidationError } from '@/errors'

const handler = async (request: NextRequest, schema: yup.ObjectSchema<any>) => {
  try {
    const body = await request.json()
    await schema.validate(body)
    return NextResponse.next()
  } catch (error) {
    console.error(error)
    const validationError = new ValidationError({
      message: (error as yup.ValidationError).message
    })
    return NextResponse.json(validationError, {
      status: validationError.status
    })
  }
}

export const middlewares = {
  '/api/v1/employees': {
    POST: async (request: NextRequest) => {
      return await handler(request, employeeSchema)
    },
    PUT: async (request: NextRequest) => {
      return await handler(request, updateEmployeeSchema)
    }
  }
}
