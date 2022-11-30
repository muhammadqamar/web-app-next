import FormData from 'form-data';
export default function handler(req, res) {

  if (req.method === 'POST') {
    let formData = new FormData();
    console.log(req.body)


    formData.append('tune[title]', 'grumpy cat');
    formData.append('tune[branch]', 'fast');
    formData.append('tune[name]', 'man');
    formData.append('tune[images][]', `data:image/png;base64,iVBORw0KGgoAAAANSUhEU`);
    // selectedImage.files?.forEach((element) => {
    //   formData.append('tune[images][]', element);
    // });
    let options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + 'sd_izwRvNfpqqP5v5g33iD8X3Vhjn2S51',
        'Content-Type':'application/json'
      },
      body:
        JSON.stringify({
          tune: {
            callback: "https://optional-callback-url.com/to-your-service-when-ready",
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
