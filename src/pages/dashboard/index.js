import React, { useRef } from "react";
import { Formik } from "formik";
import { Alert, Button, Modal } from "react-bootstrap";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import TimeLine from "../../compunents/comman/timeLine";

const Index = () => {
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
          initialValues={{ name: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
              <div className="user-detail">
                <div className="input-box">
                  <label>Your Name</label>
                  <input
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p className="">{errors.name && touched.name && errors.name}</p>
                </div>
                <div className="input-box">
                  <label>Your Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className="">{errors.email && touched.email && errors.email}</p>
                </div>
                <div className="input-box">
                  <label>Your Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p className="">{errors.password && touched.password && errors.password}</p>
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
                    <Modal.Title id="contained-modal-title-vcenter">Take a Picture</Modal.Title>
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
                          src={typeof data === "string" ? data : URL.createObjectURL(data)}
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
                name="myImage"
                onChange={(event) => {
                  setSelectedImage({ files: [...selectedImage.files, ...event.target.files] });
                  console.log(event.target.files);
                }}
                multiple
                style={{ display: "none" }}
              />

              <button
                className="submit-btn"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
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

export default Index;
