import React from 'react';
import styled from 'styled-components';

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'relative',
    width: '200px',
    height: '200px',
  },
};

export default class Search extends React.PureComponent {
  render() {
    const { photoUrl = '', handle = '', location = '', age = 99, photoCount = 0 } = this.props;

    console.log(handle, photoCount);

    return (
      <Card>
        <div className="border">
          <Avatar>
            <Description>
              <h6 className="date-name">{handle}</h6>
              <div className="date-information">
                <span>{location ? `${age} • ${location}` : age}</span>
              </div>
            </Description>
            <img src={photoUrl} alt="potential date" />
          </Avatar>
        </div>
      </Card>
    );
  }
}

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .border {
    border: 1px solid lightgray;
    border-radius: 8px;
    box-shadow: 0 3px 6px lightgray, 0 3px 6px;
    overflow: hidden;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const Description = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: end;

  .date-name {
    font-size: 16px;
  }

  .date-description {
    justify-self: flex-end;
  }
`;
