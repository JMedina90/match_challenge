import { FC } from 'react';
import styled from 'styled-components';

interface ISearch {
  photoUrl: string;
  handle: string;
  location: string;
  age: number;
}

const Search: FC<ISearch> = ({ photoUrl, handle, location, age }) => {
  return (
    <Card>
      <div className="border">
        <Avatar>
          <Description>
            <h6 className="date-name">{handle}</h6>
            <div className="date-information">
              <div>{location ? `${age} • ${location}` : age}</div>
              <div>'change'</div>
            </div>
          </Description>
          <img src={photoUrl} alt="potential date" />
        </Avatar>
      </div>
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
`;

const Description = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  margin: 8px;

  .date-name {
    font-size: 16px;
  }

  .date-information {
    display: flex;
    justify-content: space-between;
  }
`;
