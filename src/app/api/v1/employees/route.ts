import { EmployeeService } from '@/services'
import { handleRequest } from '@/utils'

const employeeService = new EmployeeService()

export const GET = async () => {
  return handleRequest(employeeService.find)
}

export const POST = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return await employeeService.create(body)
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await employeeService.update(body)
  })
}
