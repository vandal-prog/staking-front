import React from "react";

import "./modal.css";

const Modal = ({ setShowModal }) => {
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Pledge record</h6>
      </div>
      <div className="modal-navigation">
        <div>Transferring</div>
        <div>In progress</div>
        <div>Completed</div>
      </div>
    </div>
  );
};

export default Modal;
