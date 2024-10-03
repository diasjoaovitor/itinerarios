import { EmployeeService } from '@/services'
import { handleRequest } from '@/utils'

const employeeService = new EmployeeService()

export const GET = async (_: Request, context: { params: { id: string } }) => {
  return handleRequest(async () => {
    const id = context.params.id
    return await employeeService.findOne(Number(id))
  })
}

export const DELETE = async (
  _: Request,
  context: { params: { id: string } }
) => {
  return handleRequest(async () => {
    const id = context.params.id
    await employeeService.delete(Number(id))
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await employeeService.update(body)
  })
}
