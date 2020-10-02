import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [room, setRoom] = useState();

  return (
    <div className="form__group">
      <input
        className="form__field"
        type="input"
        id="name"
        name="name"
        placeholder="Room.."
        autoComplete="off"
        onChange={(event) => setRoom(event.target.value)}
      />
      <label htmlFor="name" className="form__label">
        Room
      </label>
      <Link
        onClick={(event) => (!room ? event.preventDefault() : null)}
        to={"/chat?room=" + room}
      >
        <button className="button mt-20" type="submit">
          Enter
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
