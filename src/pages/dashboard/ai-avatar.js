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
          initialValues={{ title: '', dropdown: '', checked: [] }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            // if (!values.password) {
            //   errors.password = "Required";
            // }
            // if (!values.email) {
            //   errors.email = "Required";
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            //   errors.email = "Invalid email address";
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);

            const formData = new FormData();
            // Object.keys(values).forEach((data) => {
            //   formData.append(data, values[data]);

            // });
            formData.append('tune[title]', 'grumpy cat');
            formData.append('tune[branch]', 'fast');
            formData.append('tune[name]', 'man');
            selectedImage.files?.forEach((element) => {
              formData.append('tune[images][]', element);
            });
            // formData.append('tune[callback]', 'man');

            let options = {
              method: 'POST',
             // headers: { 'content-type': 'multipart/form-data;boundary=MyBoundary' },
              body:  formData,
            };
            fetch('https://web-next-app.netlify.app/api/finetune', options)
              .then((r) => r.json())
              .then((data) => console.log(data))
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
                  <p className="">
                    {errors.title && touched.title && errors.title}
                  </p>
                </div>
                <div className="input-box">
                  <label>Select:</label>
                  <Form.Select
                    name="dropdown"
                    value={values.dropdown}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-label="Default select example"
                  >
                    <option>Open this select menu</option>
                    <option value="One">One</option>
                    <option value="Two"></option>
                    <option value="Three">Three</option>
                  </Form.Select>
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
                      name="checked"
                      value="Mixed Outputs"
                    />
                    <span>Mixed Outputs</span>
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="checked"
                      value="Linkedin Profile Pic"
                    />
                    <span>Linkedin Profile Pic</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="checked" value="Christmas" />
                    <span>Christmas</span>
                  </label>
                  <label>
                    <Field type="checkbox" name="checked" value="Vikings" />
                    <span>Vikings</span>
                  </label>
                </div>
              </div>
              <div className="select-images-box">
                <h5 className="select-img-heading">Select Images</h5>
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
                // disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AiAvatar;
