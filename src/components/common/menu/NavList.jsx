import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImgUser from "../../../img/user.png";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

const UserProfileStyle = styled.div`
  background-color: rgba(145, 158, 171, 0.12);
  padding: 16px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3rem;
  margin: 1rem;
  cursor: pointer;

  & div {
    margin-left: 0.5rem;
  }

  & div p {
    margin: 0;
    text-align: center;
    color: var(--grayDark);
  }

  .nameUser {
    font-weight: 600;
    text-align: left;
  }
  .nameRole {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
    margin-top: 0.3rem;
  }
  img {
    margin-right: 0.8rem;
  }
`;

const NavList = ({ links }) => {
  const [nameUser, setNameUser] = useState(
    localStorage.getItem("name") ?? "User"
  );
  const [role, setRole] = useState(localStorage.getItem("role") ?? "Role");

  const navigate = useNavigate();

  return (
    <div>
      <UserProfileStyle onClick={() =>{ navigate('/opciones')  }}>
        <img src={ImgUser} alt="user" style={{ width: "30px" }} />
        <div>
          <p className="nameUser">{nameUser}</p>
          <p className="nameRole">{role}</p>
        </div>
      </UserProfileStyle>
      <List component="nav" aria-label="cicle">
        {links}
      </List>

      <Divider />
    </div>
  );
};

export default NavList;
