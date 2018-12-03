import React from "react";
import UserMapper from '../../data/UserMapper'

export default function User({ name, id }) {
  let userMapper = new UserMapper();
  return (
    <li className="list-group-item">
      <a href={"/profile/" + id}>
      <span style={{marginRight: '10px'}} className="icon glyphicon glyphicon-user" />
      {name}
      </a>
    </li>
  );
}
