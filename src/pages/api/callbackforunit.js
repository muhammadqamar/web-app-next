// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      tuneId: req.body.id,
      email:req.query.email,
      text:req.query.text.replace(/,/g, " ")
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://web-next-app.netlify.app/api/prompt', requestOptions).then((r) => r.json())
    .then((data) => res.status(200).json({ response: data }))
    .catch((error) => res.status(500).json({ response: error }));

  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
