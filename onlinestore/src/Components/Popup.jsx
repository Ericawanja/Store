import React from "react";

function Popup({ setPopup, popup_details }) {
  console.log(setPopup, popup_details);
  let { action, data } = popup_details;
  return (
    <div>
      <div className="popupWrapper">
        {action === "delete" ? (
          <span>
            You have successfully deleted {data.title} from the store{" "}
          </span>
        ) : action === "edit" ? (
          <span>You have successfully edited  product with id {data.id} </span>
        ) : action === "add" ? (
          <span>You have successfully added the item id {data.id} to the store</span>
        ) : (
          ""
        )}
        <div className="popup_btn">
          <button onClick={() => setPopup(false)}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
