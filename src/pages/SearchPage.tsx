import React from 'react';

// Libs
import styled from 'styled-components';

// Components
import MinimalButton from '../components/MinimalButton';
import Spinner from 'components/Spinner';
import SearchCard from '../components/SearchCard';

// Context / Store
import { ProfileContext } from '../components/ProfilesContextProvider';

// Interfaces
import { IUser, IPropsPage, ISearchPage } from 'interfaces/index';

// Misc
import { getProfiles } from 'api/api';
import ErrorFetch from 'components/ErrorFetch';

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
    let { cachedProfiles, refetch } = this.context;

    // Check if the user has timer set when loading the page, so it doesnt loses its current matches
    if (refetch) this.startTimer();

    if (!cachedProfiles.length) {
      await this.startProfiles();
    } else {
      this.getCachedProfiles();
    }
  };

  componentDidUpdate = () => {
    const { refetch } = this.context;
    if (!refetch) {
      clearInterval(this.interval);
    }
  };

  getCachedProfiles = () => {
    // Get cached profiles so the user doesnt call the api again
    let cachedProfiles = this.context?.cachedProfiles;
    this.context.dispatch({ type: 'get_profiles', payload: cachedProfiles });
    this.setState({ ...this.state, isLoading: false });
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
            await this.fetchProfiles();
          }
        }
      );
    }, 1000);
  };

  startTimer = () => {
    this.context.dispatch({ type: 'timer', payload: true });
    this.timer();
  };

  startProfiles = () => {
    // simulate delay to show loading component
    setTimeout(() => {
      this.fetchProfiles();
    }, 2000);
  };

  fetchProfiles = async () => {
    try {
      const data = await getProfiles();
      this.context.dispatch({ type: 'get_profiles', payload: data });
      this.setState({ ...this.state, isLoading: false });
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, isError: true });
    }
  };

  stopTimer = () => {
    this.context.dispatch({ type: 'timer', payload: false });
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

    if (isError) return <ErrorFetch />;

    return (
      <React.Fragment>
        <Options>
          <div className="left-options">
            <strong>Refresh profile in: </strong> {countDown} seconds
          </div>

          <div className="right-options">
            <div>
              <MinimalButton onClick={this.startTimer}>
                <div arial-label="Stop refreshing users">Restart Timer</div>
              </MinimalButton>
              <MinimalButton onClick={this.stopTimer}>
                <div arial-label="Stop refreshing users">Stop Timer</div>
              </MinimalButton>
            </div>
            <div>
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
          </div>
        </Options>

        <UsersGrid>
          {profiles?.map((profile: IUser) => {
            const { login, picture, name, location, dob } = profile;

            return (
              <SearchCard
                key={login.username}
                photoUrl={picture.large}
                name={name.first}
                location={location.city}
                age={dob.age}
                username={login.username}
              />
            );
          })}
        </UsersGrid>

        <PaginationContainer>
          Pages:
          {Array.from({ length: totalPages }, (_, p) => {
            return (
              <MinimalButton key={p} onClick={() => this.handlePagination(p, limit)}>
                {p + 1}
              </MinimalButton>
            );
          })}
        </PaginationContainer>
      </React.Fragment>
    );
  }
}

export default SearchPage;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  .left-options {
    display: flex;
    align-items: center;
  }
  .right-options {
    display: flex;
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    .right-options {
      flex-direction: column;
    }
  }
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
