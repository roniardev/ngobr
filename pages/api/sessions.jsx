import { withIronSession } from 'next-iron-session'
import { randomBytes } from 'crypto'

const VALID_USERNAME = process.env.VALID_USERNAME
const VALID_PASSWORD = process.env.VALID_PASSWORD

export default withIronSession(
  async (req, res) => {
    if (req.cookies.csrf === undefined) {
      req.cookies.csrf = randomBytes(100).toString('base64')
    }

    if (req.method === 'POST') {
      const { username, password } = req.body

      if (
        username === VALID_USERNAME &&
        password === VALID_PASSWORD &&
        req.cookies.csrf === req.body.csrf
      ) {
        req.session.set('user', { username })
        await req.session.save()
        return res.status(201).send('')
      }

      return res.status(403).send('login Gagal')
    }

    if (req.method === 'DEL') {
      req.session.destroy()
    }

    return res.status(404).send('Not Found')
  },
  {
    cookieName: 'AUTH_COOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
)
