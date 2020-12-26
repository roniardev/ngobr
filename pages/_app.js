import { GlobalStyles } from 'twin.macro'
import GlobalFonts from '@/components/fonts'
import { ThemeProvider } from 'next-themes'

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <GlobalStyles />
    <GlobalFonts />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
