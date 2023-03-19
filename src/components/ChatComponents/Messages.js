import React from "react";
import "../../chat.css";
class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        <li id="welcomeMessage">Welcome {this.props.thisMember.username}</li>
        {messages.map((m, key) => this.renderMessage(m, key))}
      </ul>
    );
  }
  renderMessage(message, key) {
    const { member, data } = message;
    key = this.props.messages[key].id;
    console.log(key);
    const currentMember = this.props.thisMember.id;
    const messageFromMe = message.member.id === currentMember;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className} key={key}>
        <span className="avatar">
          <img
            src={process.env.PUBLIC_URL + "/" + member.clientData.avatar}
            alt="avatar"
          />
        </span>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{data}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
