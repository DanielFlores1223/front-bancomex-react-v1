import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const LinkStyled = styled(Link)`
  padding-left: 1rem;  
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #95A5A6;
  font-size: 14px;
  height: 40px;
  margin: 0 0.5rem;

  &:hover {
          background-color: #8390A3;
          color: white;
          border-radius: 10px;
     }

  & span {
          margin-left: 0.8rem;
      }

`;
