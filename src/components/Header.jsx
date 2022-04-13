import styled from 'styled-components';

export default function Header() {
  // Include search input here.
  return (
    <HeaderContainer>
      <img src="./logo.svg" alt="match" width="110" />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  border-bottom: 1px solid #efefef;
  padding: 16px;
`;
