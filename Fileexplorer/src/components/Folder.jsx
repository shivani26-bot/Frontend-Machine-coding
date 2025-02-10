import React, { useState } from "react";
import "./Folder.css";
// we can directly write props or destructure like below
export default function Folder({ explorer, handleInsertNode }) {
  console.log("exp", explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    // to track whether its a folder or file
    isFolder: null,
  });
  // const handleshowInput = () => {
  //   setShowInput(!showInput);
  // };

  // stopPropagation method is used in JavaScript to stop the propagation of an event in the event flow. It prevents the event from bubbling up to parent elements or capturing down to child elements. This is useful when you want to prevent an event handler on a parent element from being executed after an event handler on a child element has handled the event.
  // Event Propagation
  // There are two main phases in event propagation:

  // Capturing Phase: The event travels from the root element down to the target element.
  // Bubbling Phase: The event travels from the target element up to the root element.
  // By default, most events bubble up from the target element to the root element. The stopPropagation method can be used to stop this bubbling behavior.

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  /* <button onClick={handleshowInput} className="btn1"> */

  /* <button
              onClick={() => {
                handleshowInput();
              }} */
  const onAddFolder = (e) => {
    // e.keyCode property is used to detect the key pressed by the user in a keyboard event.
    // e.keyCode === 13 checks if the Enter key (which has a key code of 13) was pressed.
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <img src="folder.png" alt="img" className="folder-img" />
          &nbsp;&nbsp;<span> {explorer.name}</span>
          <div className="btns">
            <button
              onClick={(e) => {
                handleNewFolder(e, true);
              }}
              className="btn1"
            >
              Folder+
            </button>
            <button
              onClick={(e) => {
                handleNewFolder(e, false);
              }}
              className="btn2"
            >
              File+
            </button>
          </div>
        </div>
        <div className="inputBox">
          {showInput.visible && (
            <div>
              <span>
                {showInput.isFolder ? (
                  <img
                    src="folder.png"
                    className="folder-img"
                    alt=""
                    srcset=""
                  />
                ) : (
                  <img src="file.png" className="folder-img" alt="" srcset="" />
                )}
              </span>

              <input
                style={{
                  height: "30px",
                  padding: "10px",
                  marginLeft: "10px",
                  position: "absolute",
                  top: "0px",
                }}
                type="text"
                // focus should come to input box
                autoFocus
                // triggered when an element loses focus.
                // This is commonly used with form elements like input fields, text areas, and select boxes to detect when the user has clicked or tabbed away from the element.
                /* The onBlur event can be useful for performing actions when an input field loses focus */
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                // when we press enter the file or folder should be added
                onKeyDown={onAddFolder}
              />
            </div>
          )}
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {explorer.items.map((exp) => {
            console.log(exp.name);
            // return <p key={exp.id}>{exp.name}</p>;
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <p className="file">
        <img src="file.png" alt="" className="folder-img" />
        {explorer.name}
      </p>
    );
  }
}
