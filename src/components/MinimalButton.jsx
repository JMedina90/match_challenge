import styled from 'styled-components';

function MinimalButton({ children, onClick, style, ...props }) {
  return (
    <Button {...props} onClick={onClick} theme={style}>
      {children}
    </Button>
  );
}

export default MinimalButton;

const Button = styled.button`
  ${(props) => props.theme};
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin: 8px;
`;
