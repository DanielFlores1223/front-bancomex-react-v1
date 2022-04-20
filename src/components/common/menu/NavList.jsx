import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import ImgUser from '../../../img/user.png';

import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";

const UserProfileStyle = styled.div `
   background-color: rgba(145, 158, 171, 0.12);
   padding: 16px 20px;
   border-radius: 12px;
   cursor: pointer;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   margin-bottom: 3rem;
   margin: 1rem;

   & div {
       margin-left: 0.5rem;
   }

   & div  p{
       margin: 0;
       text-align: center;
       color: var(--grayDark);
   }

   .nameUser{
       font-weight: 600;
   }
`;   

const NavList = ( { links } ) => {
  const [nameUser, setNameUser] = useState((localStorage.getItem('name') ?? 'User'));
  const [role, setRole] = useState((localStorage.getItem('role') ?? 'Role'))

  return (
    <div>
      <UserProfileStyle>
              <img src={ImgUser} alt='user' style={{width: '30px'}} />
              <div>
                  <p className='nameUser'>{nameUser}</p>
                  <p>{role}</p>
              </div>
        </UserProfileStyle>
      <List component="nav" aria-label="cicle">

        { links }

      </List>

      <Divider />
    </div>
  )
}

export default NavList