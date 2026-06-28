export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR', receipt } = req.body;

    const RAZORPAY_KEY_ID = 'rzp_live_RnbwErlMvkWnMv';
    const RAZORPAY_SECRET = 'liaZ89A5kIXlUMbvp14dgZqF';

    const basicAuth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_SECRET}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.description || 'Razorpay order creation failed');
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ error: error.message });
  }
}
