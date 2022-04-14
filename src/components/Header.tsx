import { useContext } from 'react';

// Libs
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Search from './Search';

// Context / Store
import { ProfileContext } from './ProfilesContextProvider';

// Helpers
import { debounce } from 'helpers';

export default function Header() {
  const { dispatch } = useContext(ProfileContext);
  const navigate = useNavigate();

  const onChange = debounce((e: any) => {
    navigate('/');
    dispatch({ type: 'search', payload: e.target.value });
  }, 1000);

  return (
    <HeaderContainer>
      <Link to="/" aria-label="Go to homescreen">
        <img src="./logo.svg" alt="Match logo" width="110" />
      </Link>
      <Search onChange={onChange} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  border-bottom: 1px solid #efefef;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;
