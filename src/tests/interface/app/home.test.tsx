import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('<Home />', () => {
  test('should render the navigation links in the header', () => {
    render(<Home />)
    const [title, home, employees, roles, workingDays, breakTimes] =
      screen.getAllByRole('link')

    expect(title).toHaveAttribute('href', '/')
    expect(home).toHaveAttribute('href', '/')
    expect(employees).toHaveAttribute('href', '/employees')
    expect(roles).toHaveAttribute('href', '/roles')
    expect(workingDays).toHaveAttribute('href', '/working-days')
    expect(breakTimes).toHaveAttribute('href', '/break-times')
  })
})
