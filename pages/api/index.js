import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export default async function handler(req, res) {
  const supabase = await createClient(supabaseUrl, supabaseKey)
  if (req.cookies.csrf === undefined) {
    req.cookies.csrf = randomBytes(100).toString('base64')
  }

  res.statusCode = 200
  if (req.method === 'POST') {
    if (!req.body.csrf) {
      res.send(`<p style="font-size: 4rem; color: red;">
                     <strong>CSRF Token not included.</strong>
                     </p>`)
    }
    if (req.body.csrf !== req.cookies.csrf) {
      res.send(`<p style="font-size: 4rem; color: red;">
                     <strong>CSRF tokens do not match.</strong>
                     </p>`)
    }

    await supabase.from('ngobrolin_data').insert([{ quote: req.body.quote }])
    res.send(JSON.stringify(req.body))
  }
  if (req.method === 'GET') {
    const content = await supabase.from('ngobrolin_data').select('quote')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ data: content.data }))
  }
}
