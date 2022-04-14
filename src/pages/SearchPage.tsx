import React from 'react';

// Libs
import styled from 'styled-components';

// Components
import MinimalButton from '../components/MinimalButton';
import Spinner from 'components/Spinner';
import SearchCard from '../components/SearchCard';

// Context
import { ProfileContext } from '../components/ProfilesContextProvider';

// Interfaces
import { IUser, IPropsPage, ISearchPage } from 'interfaces/index';

// Misc
import { getProfiles } from 'api/api';

class SearchPage extends React.Component<IPropsPage, ISearchPage> {
  static contextType = ProfileContext;
  private interval: any = null;

  constructor(props: IPropsPage) {
    super(props);
    this.interval = null;
    this.state = {
      isLoading: true,
      isError: false,
      countDown: 10,
    };
  }

  componentDidMount = async () => {
    await this.startProfiles();
  };

  timer = () => {
    this.interval = setInterval(async () => {
      this.setState(
        (prevState) => {
          let { countDown } = prevState;

          return {
            ...prevState,
            countDown: countDown === 0 ? 10 : countDown - 1,
          };
        },
        async () => {
          if (this.state.countDown < 1) {
            await this.getProfiles();
            console.log('test');
          }
        }
      );
    }, 1000);
  };

  startTimer = () => {
    this.timer();
  };

  startProfiles = () => {
    setTimeout(() => {
      // this.startTimer();
      this.getProfiles();
    }, 2000);
  };

  getProfiles = async () => {
    try {
      //simulate fetch wait
      const data = await getProfiles();
      this.context.dispatch({ type: 'get_profiles', payload: data });
      this.setState({ ...this.state, isLoading: false });
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, isError: true });
    }
  };

  stopTimer = () => {
    console.log('first');
    clearInterval(this.interval);
  };

  handleSortAscending = () => {
    this.context.dispatch({ type: 'ascending' });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: 'descending' });
  };

  handlePagination = (page: number, limit: number) => {
    const offset = page === 0 ? 0 : page * limit;
    this.context.dispatch({ type: 'paginate', payload: { offset, page } });
  };

  render() {
    const { isLoading, isError, countDown } = this.state;
    const { profiles = [], totalPages, limit } = this.context;

    if (isLoading) return <Spinner text="Loading your matches. Please wait!" />;

    // make error component
    if (isError) {
      return <div>An error ocurred while loading your matches. Please try again</div>;
    }

    return (
      <React.Fragment>
        <Main>
          <Options>
            <div>
              <strong>Refresh in:</strong> {countDown}
            </div>

            <div>
              <MinimalButton onClick={this.stopTimer}>
                <div arial-label="Stop refreshing users">STOP</div>
              </MinimalButton>
              <MinimalButton disabled>
                <img src="filter.svg" width={22} alt="filter" />
              </MinimalButton>

              <MinimalButton onClick={this.handleSortAscending}>
                <img src="./ascending.svg" width={22} alt="Sort ascending" />
              </MinimalButton>

              <MinimalButton onClick={this.handleSortDescending}>
                <img src="./descending.svg" width={22} alt="Sort descending" />
              </MinimalButton>
            </div>
          </Options>

          <UsersGrid>
            {profiles?.map((profile: IUser) => {
              const { login, picture, name, location, dob } = profile;

              return (
                <SearchCard
                  key={login.uuid}
                  photoUrl={picture.large}
                  name={name.first}
                  location={location.city}
                  age={dob.age}
                />
              );
            })}
          </UsersGrid>

          <PaginationContainer>
            Pages:
            {Array.from({ length: totalPages }, (_, p) => {
              return (
                <MinimalButton onClick={() => this.handlePagination(p, limit)}>
                  {p + 1}
                </MinimalButton>
              );
            })}
          </PaginationContainer>
        </Main>
      </React.Fragment>
    );
  }
}

export default SearchPage;

const Main = styled.main`
  margin: 24px;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;

  @media only screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
  }
`;

const PaginationContainer = styled.div`
  margin: 50px;
`;
