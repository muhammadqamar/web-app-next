// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
   if (req.method === 'POST') {
    console.log(req)

  } else {
    res.status(500).json({ message: 'method not required' })
  }

}
