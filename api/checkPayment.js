import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { reference_number } = req.body;

  if (!reference_number) {
    return res.status(400).json({ error: 'Reference number required' });
  }

  // Query the database
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('reference_number', reference_number);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length > 0) {
    return res.json({ status: '✅ Payment Verified!' });
  } else {
    return res.json({ status: '❌ Payment Not Found!' });
  }
}
