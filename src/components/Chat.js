import React from "react";
import Input from "./ChatComponents/Input";
import Messages from "./ChatComponents/Messages";
import Members from "./ChatComponents/Members";

import "../chat.css";
class Chat extends React.Component {
  render() {
    const { messages, thisMember, allUsers, onSendMessage } = this.props;
    return (
      <div>
        <div className="App-header">
          <header>
            <h1>Ol' message board</h1>
          </header>
        </div>
        <div className="container">
          <Messages messages={messages} thisMember={thisMember} />
          <Members allUsers={allUsers} />
        </div>
        <Input onSendMessage={onSendMessage} />
      </div>
    );
  }
}

export default Chat;
