import React from "react";

function Dialog({ onConfirm, onCancel }) {
  return (
    <div className="wrapper">
      <div className="dialog">
        <div className="content">
          <p>Do you want to continue?</p>
        </div>
        <div className="buttons">
          <button type="button" className="confirm" onClick={onConfirm}>
            Continue
          </button>
          <button type="button" className="cancel" onClick={onCancel}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
