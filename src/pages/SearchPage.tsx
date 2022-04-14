import React from 'react';
import { ProfileContext } from '../components/ProfilesContextProvider';
import MinimalButton from '../components/MinimalButton';
import SearchCard from '../components/SearchCard';
import { getProfiles } from 'api/api';
import Spinner from 'components/Spinner';
import { IUser } from 'interfaces';

interface Props {
  interval: number;
}

interface ISearchPage {
  isLoading: boolean;
  isError: boolean;
  countDown: number;
}

class SearchPage extends React.Component<Props, ISearchPage> {
  static contextType = ProfileContext;
  private interval: any = null;

  constructor(props: Props) {
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
      this.context.dispatch({ type: 'get_profiles', profiles: data });
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

  handlePagination = (page: number) => {
    console.log(page);
  };

  render() {
    const { isLoading, isError, countDown } = this.state;
    const { profiles = [], totalPages } = this.context;

    // make loading component
    if (isLoading) return <Spinner text="Loading your matches. Please wait!" />;

    // make error component
    if (isError) {
      return <div>An error ocurred while loading your matches. Please try again</div>;
    }

    return (
      <React.Fragment>
        <main style={{ margin: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>Refresh in:</strong> {countDown}
            </div>

            <div>
              <MinimalButton onClick={this.stopTimer}>
                <div>STOP</div>
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
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridGap: '16px',
            }}
          >
            {profiles?.map((profile: IUser) => {
              const { login, picture, name, location, dob } = profile;

              return (
                <SearchCard
                  key={login.uuid}
                  photoUrl={picture.large}
                  handle={name.first}
                  location={location.city}
                  age={dob.age}
                />
              );
            })}
          </div>
          <div style={{ margin: 50 }}></div>
          {Array.from({ length: totalPages }, (_, p) => {
            return <MinimalButton onClick={() => this.handlePagination(p)}>{p}</MinimalButton>;
          })}
        </main>
      </React.Fragment>
    );
  }
}

export default SearchPage;
