// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'GET') {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_AVATA_AI_KEY}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://api.astria.ai/tunes", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json({ response: result }))
        .catch(error =>  res.status(500).json({ response: error }));


    } else {
      res.status(500).json({ message: 'method not required' });
    }
  }
