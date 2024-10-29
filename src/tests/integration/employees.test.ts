import { TEmployeeModel } from '@/models'
import { EmployeeRequest } from '@/requests'

describe('/employees', () => {
  it('should return an empty employee list', async () => {
    const request = new EmployeeRequest()
    const result = await request.getAll()
    expect(result).toHaveLength(0)
  })

  it('should add a new employee', async () => {
    const request = new EmployeeRequest()
    const result = await request.create({
      name: 'John Doe'
    })
    expect(result).toBe(1)
  })

  it('should return a employee by id', async () => {
    const request = new EmployeeRequest()
    const { id, name, createdAt, updatedAt } = (await request.getById(
      1
    )) as TEmployeeModel
    expect(id).toBe(1)
    expect(name).toBe('John Doe')
    expect(createdAt).toBe(new Date(createdAt).toISOString())
    expect(updatedAt).toBe(new Date(updatedAt).toISOString())
  })

  it('should update a employee', async () => {
    const request = new EmployeeRequest()
    await request.update({
      name: 'John Doe Updated',
      id: 1
    })
    const { name } = (await request.getById(1)) as TEmployeeModel
    expect(name).toBe('John Doe Updated')
  })

  it('should delete a employee', async () => {
    const request = new EmployeeRequest()
    await request.delete(1)
    await request
      .getById(1)
      .then(() => {
        expect(true).toBe(false)
      })
      .catch((error) => {
        expect(error.code).toBe('not-found')
        expect(error.message).toBe('Registro não encontrado.')
        expect(error.status).toBe(404)
      })
  })

  it('should return a validation error when get a employee by invalid id', async () => {
    const request = new EmployeeRequest()
    await request
      .getById('a' as any as number)
      .then(() => {
        expect(true).toBe(false)
      })
      .catch((error) => {
        expect(error.code).toBe('invalid-id')
        expect(error.message).toBe('ID inválido')
        expect(error.status).toBe(400)
      })
  })

  it('should return a validation error when create a employee with invalid data', async () => {
    const request = new EmployeeRequest()
    await request
      .create({} as any)
      .then(() => {
        expect(true).toBe(false)
      })
      .catch((error) => {
        expect(error.code).toBe('invalid-data')
        expect(error.message).toBe('Nome é obrigatório')
        expect(error.status).toBe(400)
      })
  })
})
