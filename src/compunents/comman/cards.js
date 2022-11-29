import React from "react";
import { Card } from "react-bootstrap";
const Cards = (props) => {
  const { onClick, cardImg, title } = props;
  return (
    <Card onClick={onClick}>
      <div
        className="card-img-top"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${cardImg}')`,
        }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Cards;
