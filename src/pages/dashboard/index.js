import React from "react";
import Link from "next/link";
import { Modal, Button } from "react-bootstrap";
import Card from "../../compunents/comman/cards";

const ImagesModel = (props) => {
  const { show, onHide, gallery } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Images Gallery</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="model-gallery-img">
          {gallery?.map((item) => (
            <div
              className="gallery-img"
              style={{
                backgroundImage: `url(${item})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Index = ({ posts }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [activeTune, setActiveTune] = React.useState([]);
  console.log(posts);
  return (
    <>
      <div className="container top-nav-btn">
        <Link href="/dashboard/ai-avatar">
          <Button variant="primary">Create New</Button>
        </Link>
      </div>
      <div className="container dashboard-cards-box">
        <div className="cards-flex-box">
          {posts?.response?.map((data) => (
            <Card
              title={data?.title}
              onClick={() => {
                setActiveTune(data.images);
                setModalShow(true);
              }}
              cardImg={data.images?.[0]}
            />
          ))}
        </div>

        <ImagesModel gallery={activeTune} show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};
export default Index;

export async function getStaticProps() {
  const res = await fetch("https://web-next-app.netlify.app/api/getAllFineTunes");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
