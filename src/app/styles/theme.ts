const hover = (hex: string) => {
  hex = hex.replace(/^#/, '')

  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  const quantidade = 40

  r = Math.max(0, r - quantidade)
  g = Math.max(0, g - quantidade)
  b = Math.max(0, b - quantidade)

  const rHex = r.toString(16).padStart(2, '0')
  const gHex = g.toString(16).padStart(2, '0')
  const bHex = b.toString(16).padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}

export const theme = {
  font: {
    light: 300,
    normal: 400,
    bold: 600,
    xxs: '0.6rem',
    xs: '1rem',
    sm: '1.4rem',
    md: '1.6rem',
    lg: '1.8rem',
    xl: '2.0rem',
    xxl: '2.8rem',
    hg: '5.2rem'
  },
  palette: {
    primary: '#0969DA',
    secondary: '#2DA44E',
    warning: '#f57c00',
    error: '#d32f2f',
    text: '#ffffff',
    subtext: '#aaaaaa',
    bg: '#0D1117',
    paper: '#161B22',
    overlay: '#00000020'
  },
  space: {
    xxs: '0.4rem',
    xs: '0.8rem',
    sm: '1.6rem',
    md: '2.4rem',
    lg: '3.2rem',
    xl: '4.0rem',
    xxl: '4.8rem',
    hg: '5.6rem'
  },
  device: {
    mobile: '500px',
    tablet: '900px',
    desktop: '1200px'
  },
  hover
}
