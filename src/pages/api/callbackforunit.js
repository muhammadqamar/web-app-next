// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      tuneId: req.body.id,
      email:req.query.email,
      text:req.query.text
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://web-next-app.netlify.app/api/prompt', requestOptions)

  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
