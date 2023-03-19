import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "../Login.css";

import { AdjectiveList, NounList } from "./Name";
const images = [
  { url: "images/avatars/avatar1.png" },
  { url: "images/avatars/avatar2.png" },
  { url: "images/avatars/avatar3.png" },
  { url: "images/avatars/avatar4.png" },
  { url: "images/avatars/avatar5.png" },
  { url: "images/avatars/avatar6.png" },
  { url: "images/avatars/avatar7.png" },
  { url: "images/avatars/avatar8.png" },
  { url: "images/avatars/avatar9.png" },
  { url: "images/avatars/avatar10.png" },
  { url: "images/avatars/avatar11.png" },
  { url: "images/avatars/avatar12.png" },
  { url: "images/avatars/avatar13.png" },
  { url: "images/avatars/avatar14.png" },
  { url: "images/avatars/avatar15.png" },
];

function Login({ handleLogin }) {
  const [avatarIndex, setAvatarIndex] = useState("");
  const [username, setUsername] = useState("");
  const [adjective, setAdjective] = useState("");
  const [noun, setNoun] = useState("");

  const selectAvatar = (index) => {
    document.getElementById("slider").style.border = "7px solid green";
    setAvatarIndex(index);
  };

  const onClickNav = () => {
    document.getElementById("slider").style.border = "5px solid wheat";
  };

  const getAdjective = (e) => {
    e.preventDefault();
    setAdjective(e.target.value);
  };

  const getNoun = (e) => {
    e.preventDefault();
    setNoun(e.target.value);
  };

  const getUsername = (e) => {
    e.target.style.display = "none";
    setUsername(adjective + noun);
    document.getElementsByClassName("nameDisplayer")[0].style.textDecoration =
      "underline";

    const select = document.getElementsByTagName("select");

    for (const el of select) {
      el.setAttribute("disabled", "true");
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <header>
          <h1>Ol' message board</h1>
        </header>
      </div>
      <div className="login">
        <div className="choice">
          <div className="avatarPicker">
            <h3>Choose your character</h3>
            <div
              id="slider"
              title="Click directly on the avatar until there is a green border to choose it."
            >
              <SimpleImageSlider
                width={"20vh"}
                height={"20vh"}
                images={images}
                showNavs={true}
                navMargin={-15}
                style={{ backgroundColor: "none" }}
                onClick={(index) => {
                  selectAvatar(index);
                }}
                onClickNav={onClickNav}
                bgColor="red"
              />
            </div>
          </div>
          <div className="namePicker">
            <h3>Choose your username</h3>
            <div className="nameMaker">
              <select
                name="adjective"
                onChange={(e) => getAdjective(e)}
                size="1"
                id="adjectives"
              >
                <option hidden={true}>Adjective</option>
                <option disabled="disabled" defaultValue={true}>
                  Adjective
                </option>
                <AdjectiveList />
              </select>
              <select
                name="noun"
                size="1"
                id="nouns"
                onChange={(e) => getNoun(e)}
              >
                <option hidden={true}>Noun</option>
                <option disabled="disabled" defaultValue={true}>
                  Noun
                </option>
                <NounList />
              </select>
              <div className="nameResult">
                <button id="nameSubmit" type="button" onClick={getUsername}>
                  Confirm
                </button>

                <h4 className="nameDisplayer">
                  <p>
                    Your name: {adjective}
                    {noun}
                  </p>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="join">
          <p id="errorMessage"></p>
          <div>
            <button
              id="joinButton"
              type="button"
              value=""
              onClick={() => handleLogin(username, avatarIndex)}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
