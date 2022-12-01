import nc from 'next-connect';
import onError from '../../compunents/comman/error';
import multer from 'multer';
import path from 'path';
import FormData from 'form-data';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc(onError);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
let filestoRead = fs.readdirSync('./public');
console.log(filestoRead);
let upload = multer({
  storage: storage,
});

let uploadFile = upload.array('file');
handler.use(uploadFile);
handler.post(async (req, res) => {
  let formData = new FormData();

  formData.append('tune[branch]', 'fast');
  formData.append('tune[branch]', 'fast');
  formData.append('tune[title]', req.body.title);
  formData.append('tune[name]', req.body.name);

  req.files.map((data) => {
    formData.append(`tune[images][]`, fs.createReadStream(data.path));
  });
  req.body.file.map((data) => {
    formData.append(`tune[images][]`, data);
  });
  let optionsForTune = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_AVATA_AI_KEY,
    },
    body: formData,
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
        text: req.body.prompts,
        callback: `https://web-next-app.netlify.app/api/callbackforunitPrompt?email=muhammadqamar111@gmail.com`,
      },
    }),
    redirect: 'follow',
  };

  const fineTune = await fetch('https://api.astria.ai/tunes', optionsForTune);
  const responseTune = await fineTune.json();

//   const callPrompt = await fetch(
//     `https://api.astria.ai/tunes/${responseTune.id}/prompts`,
//     optionsForPrompt
//   );
//   const responsePrompt = await callPrompt.json();
  res.status(200).json({ response: responseTune });
});

export default handler;
