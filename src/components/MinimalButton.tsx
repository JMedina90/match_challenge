import React, { FC } from 'react';
import styled from 'styled-components';

interface IMinimalButton {
  children: React.ReactNode;
  onClick: () => {};
  style: string;
  [x: string]: any;
}

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
`;
