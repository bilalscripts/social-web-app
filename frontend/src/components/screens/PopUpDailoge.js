import React from 'react';

const PopUpDailoge = (props) => {
  return (
    <div className="popup-box" data-aos="zoom-in">
      <div className="boxx">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
}


export default PopUpDailoge;