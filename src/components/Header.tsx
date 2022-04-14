import { debounce } from 'helpers';
import { useContext } from 'react';
import styled from 'styled-components';
import { ProfileContext } from './ProfilesContextProvider';
import Search from './Search';

export default function Header() {
  const { dispatch } = useContext(ProfileContext);

  const onChange = debounce(
    (e: any) => dispatch({ type: 'search', payload: e.target.value }),
    1000
  );

  return (
    <HeaderContainer>
      <a href="/" aria-label="Go to homescreen">
        <img src="./logo.svg" alt="Match logo" width="110" />
      </a>
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
