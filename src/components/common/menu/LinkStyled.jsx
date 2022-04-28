import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const LinkStyled = styled(Link)`
  padding-left: 1rem;  
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  font-size: .9rem;
  height: 40px;
  margin-left: 0.8rem;

  &:hover {
          background-color: #103160;
          color: white;
          border-radius: 8px 0px 0px 8px;
     }

  & span {
          margin-left: 1rem;
      }

`;
