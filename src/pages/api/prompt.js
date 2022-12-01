// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(req.body);
  if (req.method === 'POST') {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${process.env.NEXT_PUBLIC_AVATA_AI_KEY}`
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      prompt: {
        text: req.body.text,
        callback: `https://web-next-app.netlify.app/api/callbackforunitPrompt?email=${req.body.email}`,
      },
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch(
      `https://api.astria.ai/tunes/${req.body.tuneId}/prompts`,
      requestOptions
    )
      .then((r) => r.json())
      .then((data) => {
        console.log("asdsad",data);
        if (!data.id) {
          fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/callbackforunitPrompt?email=${req.body.email}`,
            {
              method: 'POST',

              body: JSON.stringify(data),
            }
          ).then((r) => r.json()).then(data1=>console.log(data1));
        }
        res.status(200).json({ response: data });
      })
      .catch((error) => res.status(500).json({ response: error }));
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
