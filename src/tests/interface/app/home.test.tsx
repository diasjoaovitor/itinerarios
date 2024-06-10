import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('<Home />', () => {
  test('should render the navigation links in the header', () => {
    render(<Home />)
    const [title, home, funcionarios, itinerarios, intervalos] =
      screen.getAllByRole('link')

    expect(title).toHaveAttribute('href', '/')
    expect(home).toHaveAttribute('href', '/')
    expect(funcionarios).toHaveAttribute('href', '/funcionarios')
    expect(itinerarios).toHaveAttribute('href', '/itinerarios')
    expect(intervalos).toHaveAttribute('href', '/intervalos')
  })
})
