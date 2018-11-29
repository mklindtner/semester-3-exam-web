import React from "react";
import User from "./User";

export default function Users({ users, error, width }) {
  const usersList = !error ? (
    users.map(user => <User key={user.id} id={user.id} name={user.name} />)
  ) : (
    <li className="list-group-item alert alert-danger">No user</li>
  );
  return (
      <div id="overlap" style={{width: width }}>
        <ul className="list-group">{usersList}</ul>
      </div>
  );
}
