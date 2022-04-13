import React from 'react';
import { ProfileContext } from '../components/ProfilesContextProvider';
import MinimalButton from '../components/MinimalButton';
import SearchCard from '../components/SearchCard';
import { getProfiles } from 'api/api';

class SearchPage extends React.Component {
  static contextType = ProfileContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount = async () => {
    try {
      //simulate fetch wait
      // setTimeout(async () => {
      const data = await getProfiles();
      this.context.dispatch({ type: 'get_profiles', profiles: data });
      this.setState({ ...this.state, isLoading: false });
      // }, 3000);
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, isError: true });
    }
  };

  handleSortAscending = () => {
    this.context.dispatch({ type: 'ascending' });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: 'descending' });
  };

  render() {
    const { isLoading, isError } = this.state;
    const { profiles = [] } = this.context;

    // make loading component
    if (isLoading)
      return (
        <div role="alert" aria-busy="true">
          Loading your matches, please wait :)
        </div>
      );

    // make error component
    if (isError) {
      return <div>An error ocurred while loading your matches. Please try again</div>;
    }

    return (
      <React.Fragment>
        <main style={{ margin: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridGap: '16px',
            }}
          >
            {profiles.map((profile) => (
              <SearchCard
                key={profile.id}
                photoUrl={profile.photoUrl}
                handle={profile.handle}
                location={profile.location}
                age={profile.age}
                photoCount={profile.photoCount}
              />
            ))}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default SearchPage;
