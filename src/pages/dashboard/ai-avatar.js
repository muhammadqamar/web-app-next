import React, { useRef } from 'react';
import { Formik, Field } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import TimeLine from '../../compunents/comman/timeLine';

const AiAvatar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({ files: [] });
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...

    setSelectedImage({ files: [...selectedImage.files, dataUri] });
  }
  const inputFolder = useRef();
  return (
    <div className="user-form">
      <TimeLine />

      <div className="main-form">
        <Formik
          initialValues={{ title: '', name: '', prompts: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.prompts) {
              errors.prompts = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {

             if(selectedImage.files?.length < 4) {
              alert('please select 4 images at least')
              setSubmitting(false)
              return
             }
            const formData = new FormData();
            Object.keys(values).forEach((data) => {
              formData.append(data, values[data]);
            });

            selectedImage.files?.forEach((element) => {
              formData.append('file', element);
            });

            let options = {
              method: 'POST',

              body: formData,
            };

            fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multer`, options)
              .then((r) => r.json())
              .then((data) =>{
                setSubmitting(false)
                if(data.response.id){
                  alert("you will be notified by email")
                }else {
                  alert(data.response.text)
                }

              } )
              .catch((error) => console.log(error));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-details">
                <h4 className="">Upload photos</h4>
                <p className="">
                  Select 10-20 photos of yourself (or you and your partner as a
                  couple, or your dog or cat). We'll train the Al to generate
                  Al-generated avatars that look just like you in any style you
                  want.
                </p>
                <h6 className="">
                  The better you follow these guidelines, the better your
                  avatars:
                </h6>

                <ul>
                  <li>No other people in your photos</li>
                  <li>Photos with different expression</li>
                  <li>Photos in different locations, backgrounds and angles</li>
                  <li>Photos at different times of day</li>
                  <li> Look into the camera and also away</li>
                  <li>Only images &gt;512x512px</li>
                  <li>No duplicate photos</li>
                  <li>No black and white photos</li>
                  <li>No photo shoots</li>
                  <li>Not only selfies</li>
                  <li>With minimal or no makeup and without sunglasses</li>
                  <li>No children</li>
                  <li>No nudes</li>
                </ul>
                <p className="">
                  <span>Note: </span> Al can have random results and may include
                  artistic nudes, erotic or otherwise shocking images, <br />
                  if you do not want that and are sensitive, we recommend you to
                  NOT use this site!
                  <br />
                  The Al may also generate artefacts and defects, this is out of
                  our control. Please accept that risk before buying!
                  <br />
                  <br />
                  or your safety: the images you upload are ONLY used to
                  generate your Al Avatars.
                  <br /> Both the images you upload and the Al model trained are
                  auto deleted within 5 Days.
                </p>
              </div>

              <div className="user-detail">
                <div className="input-box">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <p className="error">
                    {errors.title && touched.title && errors.title}
                  </p>
                </div>
                <div className="input-box">
                  <label>Select Name:</label>
                  <Form.Select
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Default select example"
                  >
                     <option  disabled></option>
                    <option value="One">Male</option>
                    <option value="Two">Female</option>
                    <option value="Car">Car</option>
                    <option value="Hat">Hat</option>
                  </Form.Select>
                  <p className="error">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
                <div
                  className="input-box"
                  role="group"
                  aria-labelledby="checkbox-group"
                  id="checkbox-group"
                >
                  <label>Select Category:</label>
                  <br />
                  <label>
                    <Field
                      type="checkbox"
                      name="prompts"
                      value='Mixed Outputs'
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span>Mixed Outputs</span>
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="prompts"

                      onChange={handleChange}
                      onBlur={handleBlur}
                      value="Linkedin Profile Pic"
                    />
                    <span>Linkedin Profile Pic</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="prompts" value="Christmas"   onChange={handleChange}
                      onBlur={handleBlur} />
                    <span>Christmas</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="prompts" value="Vikings"   onChange={handleChange}
                      onBlur={handleBlur} />
                    <span>Vikings</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="prompts" value="portrait of sks cat as Santa dClaus8"   onChange={handleChange}
                      onBlur={handleBlur} />
                    <span>For testing</span>
                  </label>


                </div>
                <p className="error">
                    {errors.prompts && touched.prompts && errors.prompts}
                  </p>
              </div>
              <div className="select-images-box">
                <h5 className="select-img-heading">Select Images atleast 4</h5>
                <Button
                  className="web-btn web"
                  variant="primary"
                  onClick={() => setModalShow(true)}
                >
                  Web Cam
                </Button>
                <Button
                  className="web-btn"
                  variant="primary"
                  onClick={() => inputFolder.current.click()}
                >
                  upload Image
                </Button>

                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Take a Picture
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Camera
                      onTakePhoto={(dataUri) => {
                        handleTakePhoto(dataUri);
                      }}
                    />
                  </Modal.Body>
                </Modal>
              </div>
              <div className="select-web-img">
                {selectedImage.files?.map(
                  (data, topCounter) =>
                    !!data && (
                      <div className="main-img-box">
                        <img
                          alt="not fount"
                          accept="image/jpeg, image/png, image/jpg"
                          src={
                            typeof data === 'string'
                              ? data
                              : URL.createObjectURL(data)
                          }
                        />
                        <br />
                        <button
                          onClick={() =>
                            setSelectedImage({
                              files: [
                                ...selectedImage.files.filter(
                                  (images, counter) => !(counter === topCounter)
                                ),
                              ],
                            })
                          }
                        >
                          <img
                            src="https://img.icons8.com/external-flat-icons-inmotus-design/512/external-close-browser-ui-elements-flat-icons-inmotus-design.png"
                            alt=""
                          />
                        </button>
                      </div>
                    )
                )}
              </div>
              <input
                ref={inputFolder}
                className="primary"
                type="file"
                name="images"
                onChange={(event) => {
                  setSelectedImage({
                    files: [...selectedImage.files, ...event.target.files],
                  });
                }}
                multiple
                style={{ display: 'none' }}
              />

              <button
                className="submit-btn"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? 'Submit' : 'Processing please wait ....'}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AiAvatar;
