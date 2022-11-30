import nextConnect from 'next-connect'
import FormData from 'form-data';
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('images'));

apiRoute.post((req, res) => {

  if (req.method === 'POST') {
    let formData = new FormData();



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
            callback: `${process.env.NEXT_PUBLIC_DOMAIN}/api/callbackforunitPrompt?email=livetest@gmail.com`,
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
})

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};