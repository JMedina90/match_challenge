import { FC } from 'react';

// Libs
import styled from 'styled-components';

// Interfaces
import type { IMinimalButton } from '../interfaces/index';

const MinimalButton: FC<IMinimalButton> = ({ children, onClick, style, ...props }) => {
  return (
    <Button {...props} onClick={onClick} theme={style}>
      {children}
    </Button>
  );
};

export default MinimalButton;

const Button = styled.button`
  ${(props) => props.theme};
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin: 8px;
  height: 42px;

  &:hover {
    background-color: #e8e8e8;
  }
`;
