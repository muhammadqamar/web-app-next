export default async function  handler(req, res) {

    if (req.method === 'POST') {
      console.log(req.body)

      let optionsForTune = {
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
      let optionsForPrompt = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + 'sd_izwRvNfpqqP5v5g33iD8X3Vhjn2S51',
          'Content-Type':'application/json'
        },
        body:
          JSON.stringify({
            prompt: {
              text: 'portrait of sks cat as Santa Claus8',
              callback: `https://web-next-app.netlify.app/api/callbackforunitPrompt?email=muhammadqamar111@gmail.com`,
            },
          })
        ,
        redirect: 'follow'
      };
        // const fineTune =  await fetch('https://api.astria.ai/tunes', optionsForTune)
        // const responseTune = await fineTune.json()

        // const callPrompt =  await fetch(`https://api.astria.ai/tunes/${responseTune.id}/prompts`, optionsForPrompt)
        // const responsePrompt =await  callPrompt.json()
        // res.status(200).json({ response: responsePrompt })

    } else {
      res.status(500).json({ message: 'method not required' });
    }
  }
