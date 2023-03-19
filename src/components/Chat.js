import React from "react";
import Input from "./ChatComponents/Input";
import Messages from "./ChatComponents/Messages";
import Members from "./ChatComponents/Members";

import "../chat.css";
class Chat extends React.Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <header>
            <h1>Ol' message board</h1>
          </header>
        </div>
        <div className="container">
          <Messages
            messages={this.props.messages}
            thisMember={this.props.thisMember}
          />
          <Members allUsers={this.props.allUsers} />
        </div>
        <Input onSendMessage={this.props.onSendMessage} />
      </div>
    );
  }
}

export default Chat;
