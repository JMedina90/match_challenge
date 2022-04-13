import Header from 'components/Header';

// Pages
import SearchPage from './pages/SearchPage';

// Context
import ProfilesContextProvider from './components/ProfilesContextProvider';

import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <Header />
      <SearchPage />
    </ProfilesContextProvider>
  );
}

export default App;
