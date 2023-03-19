import React from "react";

class Members extends React.Component {
  render() {
    return (
      <div className="memberList">
        <ul>
          <h4>Active guild members:</h4>
          {this.props.allUsers.map((el) => (
            <li key={el.id}>{el.clientData.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Members;
