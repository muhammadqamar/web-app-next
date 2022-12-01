export default async function  handler(req, res) {

  if (req.method === 'POST') {
    const bodyData = JSON.parse(req.body)

    let optionsForTune = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_AVATA_AI_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tune: {
          title: bodyData.title,
          name: bodyData.name,
          branch: "fast",
          image_urls: bodyData.image_urls
        }
      }),
      redirect: 'follow',
    };
    let optionsForPrompt = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_AVATA_AI_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: {
          text: bodyData.prompts,
          callback: `https://web-next-app.netlify.app/api/callbackforunitPrompt?email=muhammadqamar111@gmail.com`,
        },
      }),
      redirect: 'follow',
    };

    const fineTune = await fetch('https://api.astria.ai/tunes', optionsForTune);
    const responseTune = await fineTune.json();

    const callPrompt = await fetch(
      `https://api.astria.ai/tunes/${responseTune.id}/prompts`,
      optionsForPrompt
    );
    const responsePrompt = await callPrompt.json();
    res.status(200).json({ response: callPrompt });
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
