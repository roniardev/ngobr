import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'
import { withIronSession } from 'next-iron-session'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export default withIronSession(
  async (req, res) => {
    try {
      const user = req.session.get('user')
      if (!user) throw new Error('unauthorized')

      res.send('login')
    } catch (err) {
      res.send('gagal')
    }
  },
  {
    cookieName: 'AUTH_COOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
)
