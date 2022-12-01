import React from "react";

const TimeLine = () => {
  return (
    <div className="user-form time_line_form">
      <div className="time-line">
        <div className="one-box">
          <div className="number">1</div>
          <h6 className="box-name">ADD DETAILS</h6>
        </div>
        <div className="hr-line" />
        <div className="one-box">
          <div className="number">2</div>
          <h6 className="box-name">OUTPUTS</h6>
        </div>
        <div className="hr-line" />
        <div className="one-box">
          <div className="number">3</div>
          <h6 className="box-name">UPSCALE</h6>
        </div>
        <div className="hr-line" />
        <div className="one-box">
          <div className="number">4</div>
          <h6 className="box-name">DOWNLOAD</h6>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
