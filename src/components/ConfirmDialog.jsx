import React from "react";
import "../styles/ConfirmDialog.css";

export default function ConfirmDialog({ 
  message, 
  onConfirm, 
  onCancel, 
  isOpen 
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-dialog-buttons">
          <button onClick={onConfirm} className="confirm-yes">Yes</button>
          <button onClick={onCancel} className="confirm-no">No</button>
        </div>
      </div>
    </div>
  );
}
