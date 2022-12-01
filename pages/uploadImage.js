import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Image from 'next/image';
const UploadImage = () => {
  const [imageDetail, setImageDetail] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, 'images/');
  const uploadImageHandler = () => {
    if (imageDetail == null) {
      return;
    }

    const imageRef = ref(storage, `images/${imageDetail.name + v4()}`);

    uploadBytes(imageRef, imageDetail)
      .then((_uploaded) => {
        console.log('Image Uploaded');
        getDownloadURL(_uploaded.ref).then((url) => {
          setImageList((pre) => [...pre, url]);
        });
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  useEffect(() => {
    setImageList([]);
    listAll(imageListRef)
      .then((_image) => {
        console.log('_image', _image);
        _image?.items?.forEach((_item) => {
          //   console.log('_item', _item);
          getDownloadURL(_item)
            .then((url) => {
              setImageList((pre) => [...pre, url]);
            })
            .catch((error) => {
              console.log('Err', error);
            });
        });
      })
      .catch((error) => {
        console.log('errrpppp', error);
      });
  }, []);
  return (
    <div>
      <h1>UploadImage</h1>

      <div>
        <input
          type={'file'}
          onChange={(e) => {
            setImageDetail(e.target.files[0]);
          }}
        />
        <button onClick={uploadImageHandler}>uploadImage</button>
      </div>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {imageList?.map((url, index) => {
          return (
            <img
              width={'300px'}
              height={'200px'}
              style={{
                marginTop: '20px',
                // backgroundPosition:""
              }}
              key={index}
              src={url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UploadImage;
