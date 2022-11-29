// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import FormData from 'form-data';
export default function handler(req, res) {

  if (req.method === 'POST') {
    let formData = new FormData();
    formData.append('tune[title]', 'grumpy cat');
    formData.append('tune[branch]', 'fast');
    formData.append('tune[name]', 'man');

    formData.append('tune[images][]','https://i.imgur.com/HLHBnl9.jpeg' );
    formData.append('tune[images][]','https://i.imgur.com/HLHBnl9.jpeg' );
    formData.append('tune[images][]','https://i.imgur.com/HLHBnl9.jpeg' );
    formData.append(
        'tune[callback]',
        'https://web-next-app.netlify.app/api/callbackforunit?email=testing@gmail.com'
      );
    let options = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + 'sd_izwRvNfpqqP5v5g33iD8X3Vhjn2S51'},
      body: formData,
    };
    return fetch('https://api.astria.ai/tunes', options).then((r) => r.json()).then(data=>res.status(200).json({ response: data })).catch((error) => res.status(500).json({ response: error }));;
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
