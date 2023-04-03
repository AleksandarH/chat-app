import "./chat.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

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

function App() {
  const initialChatState = {
    member: { username: "", avatar: "" },
    messages: [],
  };
  const [chat, setChat] = useState(initialChatState);
  const [drone, setDrone] = useState(null);
  let [allUsers, setUsers] = useState([]);

  useEffect(() => {
    if (chat.member.username !== "" && chat.member.avatar !== "") {
      const drone = new window.Scaledrone("UEKmz7W5dMWR2RkD", {
        data: chat.member,
      });
      setDrone(drone);
    }
  }, [chat.member]);

  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      chat.member.id = drone.clientId;
      setChat({ ...chat }, chat.member);

      const room = drone.subscribe("observable-room");

      room.on("message", (message) => {
        const { data, member, id } = message;
        chat.messages.push({ member, data, id });
        setChat({ ...chat }, chat.messages);
      });

      room.on("members", (members) => {
        setUsers(members);
      });

      room.on("member_join", (member) => {
        setUsers((current) => [...current, member]);
      });

      room.on("member_leave", (member) => {
        setUsers((current) =>
          current.filter(
            (el) => el.clientData.username !== member.clientData.username
          )
        );
      });
    });
  }

  const onSendMessage = (message) => {
    const input = document.getElementsByTagName("input")[0];
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
      input.style.border = "none";
      input.style.borderBottom = "8px solid rgb(58, 58, 58)";
    } else {
      input.style.border = "3px solid red";
    }
  };

  const handleLogin = (username, avatarIndex) => {
    const errorMsg = document.getElementById("errorMessage");

    if (!chat.member.username || !chat.member.avatar) {
      errorMsg.innerText =
        "Please choose a character and confirm your username to continue";
    }
    chat.member = {
      username: username,
      avatar: images[avatarIndex].url,
    };
    setChat({ ...chat }, chat.member);
  };
  if (!chat.member.username || !chat.member.avatar) {
    return <Login handleLogin={handleLogin} />;
  } else {
    return (
      <div className="App">
        <Chat
          messages={chat.messages}
          thisMember={chat.member}
          onSendMessage={onSendMessage}
          allUsers={allUsers}
        />
      </div>
    );
  }
}

export default App;
