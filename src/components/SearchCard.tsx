import { FC } from 'react';

// Libs
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Interfaces
import type { ISearchCard } from '../interfaces/index';

const Search: FC<ISearchCard> = ({ photoUrl, name, location, age, username }) => {
  return (
    <Card>
      <Avatar>
        <Description to={`/profile?username=${username}`} aria-label={`Visit ${name} profile`}>
          <h6 className="date-name">{name}</h6>
          <div className="date-information">
            <div>{location ? `${age} • ${location}` : age}</div>
          </div>
        </Description>
        <img src={photoUrl} alt="potential date" />
      </Avatar>
    </Card>
  );
};

export default Search;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 3px 6px lightgray, 0 3px 6px;

  img {
    border-radius: 8px;
    width: 200px;
  }

  @media only screen and (max-width: 767px) {
    width: 150px;
    height: 150px;

    img {
      border-radius: 8px;
      width: 150px;
    }
  }
`;

const Description = styled(Link)`
  display: flex;
  justify-content: end;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 8px;
  background: rgb(0, 0, 0);
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  border-radius: 5px;

  .date-name {
    font-size: 16px;
  }

  .date-information {
    display: flex;
    justify-content: space-between;
  }

  &:hover {
    color: #1927ef;
  }
`;
