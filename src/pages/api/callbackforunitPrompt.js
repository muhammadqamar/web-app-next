// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method !== 'POST') {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer sd_izwRvNfpqqP5v5g33iD8X3Vhjn2S51'
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      prompt: {
        text: 'sks tree',
        callback:
          'https://web-next-app.netlify.app/api/callbackforunit?email=qqq@gmail.com',
      },
      branch: 'fast',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch('https://api.astria.ai/tunes/23154/prompts', requestOptions)
      .then((r) => r.json())
      .then((data) => res.status(200).json({ response: data }))
      .catch((error) => res.status(500).json({ response: error }));
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
