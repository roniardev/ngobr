import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'
import { withIronSession } from 'next-iron-session'

// Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export default withIronSession(
  async (req, res) => {
    try {
      const user = req.session.get('user')
      if (!user) throw new Error('unauthorized')
      const supabase = await createClient(supabaseUrl, supabaseKey)

      if (req.method === 'GET') {
        const content = await supabase.from('ngobrolin_data')

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data: content.data }))
      }

      if (req.method === 'DELETE') {
        const val = req.body.val
        await supabase.from('ngobrolin_data').delete().eq('id', val)

        res.statusCode = 200
        res.send('Deleted')
      }

      if (req.method === 'PATCH') {
        const val = req.body.val
        const id = req.body.id
        await supabase
          .from('ngobrolin_data')
          .update({ quote: val })
          .match({ id: id })
        res.statusCode = 200
        res.send('Update quote approved')
      }

      if (req.method === 'PUT') {
        const val = req.body.val
        const id = req.body.id

        await supabase
          .from('ngobrolin_data')
          .update({ is_approved: val })
          .match({ id: id })
        res.statusCode = 200
        res.send('Update is_approved')
      }
    } catch (err) {
      res.send('failed connection to API ')
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
