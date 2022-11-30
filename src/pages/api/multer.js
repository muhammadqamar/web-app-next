import nc from 'next-connect';
import onError from '../../compunents/comman/error';
import multer from 'multer';
//import path from 'path';
import FormData from 'form-data';
// import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc(onError);

let upload = multer();

let uploadFile = upload.array('file');
handler.use(uploadFile);
handler.post(async (req, res) => {
  let formData = new FormData();
   console.log(req.body)
  formData.append('tune[branch]', 'fast');
   formData.append('tune[title]', req.body.title);
  formData.append('tune[name]', req.body.name);
  req.body.file.map((data) => {
    formData.append(`tune[images][]`, data);
  });
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
          text: req.body.prompts,
          callback: `https://web-next-app.netlify.app/api/callbackforunitPrompt?email=muhammadqamar111@gmail.com`,
        },
      })
    ,
    redirect: 'follow'
  };

  const fineTune = await fetch('https://api.astria.ai/tunes', optionsForTune);
  const responseTune = await fineTune.json();

  const callPrompt = await fetch(
    `https://api.astria.ai/tunes/${responseTune.id}/prompts`,
    optionsForPrompt
  );
  const responsePrompt = await callPrompt.json();
  res.status(200).json({ response: responsePrompt });
});

export default handler;
