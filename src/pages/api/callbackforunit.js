export default function handler(req, res) {

  if (req.method === 'POST') {

    const promptText="portrait of sks cat as Santa Claus"

    let options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + 'sd_izwRvNfpqqP5v5g33iD8X3Vhjn2S51',
        'Content-Type':'application/json'
      },
      body:
        JSON.stringify({
          tune: {
            callback: `${process.env.NEXT_PUBLIC_DOMAIN}/api/callbackforunit`,
            title: "Grumpy cat",
            name: "cat",
            branch: "fast",
            image_urls: [
              `https://i.imgur.com/HLHBnl9.jpeg`,
              "https://i.imgur.com/HLHBnl9.jpeg",
              "https://i.imgur.com/HLHBnl9.jpeg",
              "https://i.imgur.com/HLHBnl9.jpeg"
            ]
          }
        })
      ,
      redirect: 'follow'
    };
      fetch('https://api.astria.ai/tunes', options)
      .then((r) => r.json())
      .then((data) => res.status(200).json({ response: data }))
      .catch((error) => res.status(500).json({ response: error }));
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
