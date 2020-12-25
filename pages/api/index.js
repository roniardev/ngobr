import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = await createClient(supabaseUrl, supabaseKey)
  res.statusCode = 200
  if (req.method === 'POST') {
    await supabase.from('ngobrolin_data').insert([{ quote: req.body.quote }])
    res.send(JSON.stringify(req.body))
  }
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe' }))
  }
}
