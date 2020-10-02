import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import axios from "axios";

import { saveAs } from "file-saver";

import "./room.css";

let socket;

function Room({ location }) {
  const [value, setValue] = useState();
  const [room, setRoom] = useState();

  const createAndDownloadPdf = () => {
    axios
      .post("https://editor-colab.herokuapp.com/create-pdf", value)
      .then(() =>
        axios.get("https://editor-colab.herokuapp.com/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        let pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "editor.pdf");
      });
    console.log("downloading...");
  };

  useEffect(() => {
    socket = io("https://editor-colab.herokuapp.com");
  }, []);

  useEffect(() => {
    const roomData = queryString.parse(location.search);

    setRoom(roomData.room);
    socket.emit("join", room);
  }, [location.search, room]);

  useEffect(() => {
    socket.once("init", (val) => {
      if (val !== value) {
        setValue(val);
      }
    });
    socket.on("chat-message", (data) => {
      if (data !== value) {
        setValue(data);
      }
    });
    socket.emit("send", room);
  }, [value, room]);

  return (
    <div className="cont">
      <button className="dload" onClick={createAndDownloadPdf}>
        Download PDF
      </button>
      <textarea
        className="editor"
        placeholder="Type to collaborate..."
        value={value}
        onChange={(event) => {
          socket.emit("chat message", event.target.value, room);
        }}
      ></textarea>
    </div>
  );
}

export default Room;
