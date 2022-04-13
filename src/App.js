import SearchPage from './pages/SearchPage';
import ProfilesContextProvider from './components/ProfilesContextProvider';

import './styles.css';
import Header from 'components/Header';

function App() {
  return (
    <ProfilesContextProvider>
      <Header />
      <SearchPage />
    </ProfilesContextProvider>
  );
}

export default App;
