// Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Header from 'components/Header';

// Context
import ProfilesContextProvider from './components/ProfilesContextProvider';

// Routes
import { routes } from './routes/publicRoutes';

import './styles.css';

function App() {
  return (
    <ProfilesContextProvider>
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            {routes.map((r) => (
              <Route key={r.path} path={r.path} element={r.component} exact={r.exact} />
            ))}
          </Routes>
        </Main>
      </BrowserRouter>
    </ProfilesContextProvider>
  );
}

export default App;

const Main = styled.main`
  margin: 24px;
`;
