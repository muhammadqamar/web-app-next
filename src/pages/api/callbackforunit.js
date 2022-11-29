// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('/prompt', requestOptions)
      .then((response) => response.text())
      .then((result) => res.status(200).json({ response: 'message sent' }))
      .catch((error) => res.status(500).json({ response: error }));
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
