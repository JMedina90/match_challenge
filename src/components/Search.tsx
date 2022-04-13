import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  onChange: () => any;
}

const Search: FC<Props> = ({ onChange = () => {} }) => {
  return (
    <SearchContainer>
      <SearchInput
        onChange={onChange}
        placeholder="Search for your perfect match!"
        aria-label="Search"
      />
      <SearchIcon>🔎</SearchIcon>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 50px 10px 10px;
  border: 1px solid #e2e2e2;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0;
  height: 40px;
  width: 40px;
  display: grid;
  place-items: center;
  border-left: none;
`;
