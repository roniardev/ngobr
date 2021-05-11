import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export default async function handler(req, res) {
  const supabase = await createClient(supabaseUrl, supabaseKey)

  if (req.cookies.csrf === undefined) {
    req.cookies.csrf = randomBytes(100).toString('base64')
  }

  if (req.method === 'POST') {
    if (req.body.csrf && req.body.csrf === req.cookies.csrf) {
      await supabase.from('ngobrolin_data').insert([{ quote: req.body.quote }])
      res.statusCode = 200
    }
    res.send(`<p style="font-size: 4rem; color: red;">
                     <strong>CSRF Token is not valid.</strong>
                     </p>`)
  }

  if (req.method === 'GET') {
    const content = await supabase
      .from('ngobrolin_data')
      .select('quote, quote_by')
      .eq('is_approved', true)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ data: content.data }))
  }
}
