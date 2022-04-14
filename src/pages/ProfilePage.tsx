import React from 'react';

// libs
import styled from 'styled-components';

// Context / Store
import { ProfileContext } from 'components/ProfilesContextProvider';

// Interfaces
import { IUser } from 'interfaces';

interface IState {
  user: IUser | undefined;
}
class ProfilePage extends React.Component<any, IState> {
  static contextType = ProfileContext;
  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount = () => {
    const search = window.location.search;
    const username = new URLSearchParams(search).get('username');

    this.getUserProfile(username);
  };

  getUserProfile = (username: string | null) => {
    const cachedProfiles: IUser[] = this.context.cachedProfiles;
    const user = cachedProfiles.find((profile) => profile.login.username === username);
    this.setState({ ...this.state, user });
  };

  render() {
    const { user } = this.state;

    if (!user) return <div>User not found!</div>;

    return (
      <ProfileContainer>
        <img src={user.picture.large} alt="User face" />

        <Details>
          <h2>
            {user?.name.first} {user?.name.last}
          </h2>
          <div>{user?.email}</div>
          <div>
            {user?.gender === 'female' ? '♀️' : '♂️'} - {user?.dob.age}
          </div>
          <div>{`${user?.location.city} - ${user?.location.state}`}</div>
          <Button>Contact this user</Button>
        </Details>
      </ProfileContainer>
    );
  }
}

export default ProfilePage;

const ProfileContainer = styled.section`
  display: flex;
  width: 40%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin: 100px auto 0 auto;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.37);
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.37);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.37);
  height: 400px;
  border-radius: 25px;
  img {
    position: absolute;
    top: 85px;
    border-radius: 50%;
    z-index: 1;
  }

  @media only screen and (max-width: 767px) {
    width: 90%;
  }
`;

const Details = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  text-align: center;
  * {
    margin-bottom: 10px;
  }

  div {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #ececec;
  &:hover {
    cursor: pointer;
    background-color: #fcfcfc;
  }
`;
