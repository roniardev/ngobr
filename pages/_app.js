import { GlobalStyles } from 'twin.macro'
import GlobalFonts from '../components/fonts'

const App = ({ Component, pageProps }) => (
  <div>
    <GlobalStyles />
    <GlobalFonts />
    <Component {...pageProps} />
  </div>
)

export default App
